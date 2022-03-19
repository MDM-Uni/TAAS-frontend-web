import {Injectable} from '@angular/core';
import {EventoPersonalizzato} from "../../models/evento-personalizzato";
import {map, Observable, of, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {Visita} from "../../../ospedale/models/visita";
import {Animale} from "../../../ospedale/models/animale";
import {VisitaDTO} from "../../../ospedale/services/gestore-visite/gestore-visite.service";
import {GestoreAnimaliService} from "../../../ospedale/services/gestore-animali/gestore-animali.service";
import {DomSanitizer} from "@angular/platform-browser";

export type EventoPersonalizzatoDTO = {
  id: number,
  data: string,
  testo: string,
  idAnimale: number,
}

@Injectable({
  providedIn: 'root'
})
export class GestoreEventiPersonalizzatiService {
  static basicUrl = 'http://localhost:8080/storia';

  constructor(
    private http: HttpClient,
    private serviceAnimale: GestoreAnimaliService,
    public sanitizer: DomSanitizer,
  ) {
  }

  postEventoPersonalizzato(evento: EventoPersonalizzato): Observable<number> {
    if (evento.animale) {
      let params = new HttpParams();
      if (evento.testo) params.set('testo', evento.testo);
      if (evento.data) params.set('data', formatDate(evento.data, "yyyy-MM-dd'T'HH:mm", 'en-US'));
      //todo manca settare immagine
      let fullUrl = `${GestoreEventiPersonalizzatiService.basicUrl}/pushEventoPersonalizzato/${evento.animale.id}?${params.toString()}`;
      return this.http.post<number>(fullUrl, null);
    } else {
      throw new Error('Nessun animale selezionato');
    }
  }

  getEventiPersonalizzati(idAnimale?: number): Observable<EventoPersonalizzato[]> {
    let url = `${GestoreEventiPersonalizzatiService.basicUrl}/getStoria`;
    if (idAnimale) url += `/${idAnimale}`;
    return this.trasformaArrayEventiPersonalizzati(this.http.get<EventoPersonalizzatoDTO[]>(url));
  }

  trasformaArrayEventiPersonalizzati(obsVisite: Observable<EventoPersonalizzatoDTO[]>): Observable<EventoPersonalizzato[]> {
    //aggiungo alle evPersonalizzati le informazioni sugli animali
    return obsVisite.pipe(
      tap(evPersonalizzati => {
        console.log("Eventi Personalizzati ricevuti: ");
        console.table(evPersonalizzati);
      }),
      //tolgo eventi a cui non corrispondono un vero animale
      map(evPersonalizzati => evPersonalizzati.filter(evPers => this.serviceAnimale.getAnimale(evPers.idAnimale))),
      tap(evPersonalizzati => {
        console.log("Visite filtrate: ");
        console.table(evPersonalizzati);
      }),
      //trasforma da tipo EventoPersonalizzatoDTO[] a EventoPersonalizzato[]
      map(evPersonalizzati => {
        return evPersonalizzati
          .map(evPer => {
            console.log("EventoDTO personalizzato: ");
            console.log(evPer);
            return evPer
          })
          .map((eventoPersonalizzatoDTO: EventoPersonalizzatoDTO) => {
            let animale: Animale = this.serviceAnimale.getAnimale(eventoPersonalizzatoDTO.idAnimale) as Animale;
            let ev = new EventoPersonalizzato();
            ev.id = eventoPersonalizzatoDTO.id;
            ev.data = new Date(eventoPersonalizzatoDTO.data);
            ev.testo = eventoPersonalizzatoDTO.testo;
            ev.animale = animale;
            this.getImmagineEvPers(eventoPersonalizzatoDTO.id).subscribe({
              next: (immagine) => {
                if (immagine) {
                  console.log("Creo url immagine da visualizzare");
                  let objectURL = URL.createObjectURL(immagine);
                  ev.immagine = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                  ev.haImmagine = true;
                } else {
                  ev.haImmagine = false;
                }
              },
              error: (err) => {
                if (err.status==404) {
                  console.log("Nessuna immagine per l'evento personalizzato");
                  ev.haImmagine = false;
                  ev.immagine = null;
                } else {
                  ev.haImmagine = false;
                  console.error(err);
                }
              }
            });
            return ev;
          });
      }),
      tap(evPersonalizzati => console.log("Eventi trasformati: " + evPersonalizzati.length)),
      tap(evPersonalizzati => {
        console.log("Eventi trasformati: ");
        console.log(evPersonalizzati);
      }),
      //ordino le evPersonalizzati per data in ordine decrescente
      map(evPersonalizzati => {
        evPersonalizzati.sort((a: EventoPersonalizzato, b: EventoPersonalizzato) =>
          ((b.data?.getTime() ?? 0) - (a.data?.getTime() ?? 0)));
        return evPersonalizzati;
      }),
      // tap(evPersonalizzati => {
      //   console.log("Eventi ordinati:");
      //   evPersonalizzati.forEach(evPers => console.log(evPers));
      // }),
    );
  }

  getUrlImmagineEvPers(idEv: number | undefined): string | null {
    if (idEv===undefined) {
      console.log("undefined mentre cerco di visualizzare l'immagine dell'Evento Personalizzato");
      return null;
    }
    let url = `${GestoreEventiPersonalizzatiService.basicUrl}/getImmagineEventoPersonalizzato/${idEv}`;
    console.log("Url per prendere l'immagine dell'evento personalizzato: " + url);
    return url;
  }

  getImmagineEvPers(idEv: number | undefined): Observable<Blob | null> {
    let url = this.getUrlImmagineEvPers(idEv);
    if (url===null) {
      return of(null);
    }
    return this.http.get(url, {responseType: 'blob'});
  }
}
