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
  static basicUrl = 'http://localhost:8079/storia';

  constructor(
    private http: HttpClient,
    private serviceAnimale: GestoreAnimaliService,
    public sanitizer: DomSanitizer,
  ) {
  }

  getEventiPersonalizzati(idAnimale?: number): Observable<EventoPersonalizzato[]> {
    let url = `${GestoreEventiPersonalizzatiService.basicUrl}/getStoria`;
    if (idAnimale) {
      url += `/${idAnimale}`;
    }
    return this.trasformaArrayEventiPersonalizzati(this.http.get<EventoPersonalizzatoDTO[]>(url));
  }

  getEventiPersonalizzatiUtente(idUtente: number, idAnimale?: number): Observable<EventoPersonalizzato[]> {
    let url = `${GestoreEventiPersonalizzatiService.basicUrl}/getStoriaUtente`;
    url += `/${idUtente}`;
    if (idAnimale) {
      url += `?idAnimale=${idAnimale}`;
    }
    return this.trasformaArrayEventiPersonalizzati(this.http.get<EventoPersonalizzatoDTO[]>(url));
  }

  deleteEventoPersonalizzato(evento: EventoPersonalizzato): Observable<void> {
    return this.http.post<void>(`${GestoreEventiPersonalizzatiService.basicUrl}/deleteEventoPersonalizzato`, evento);
  }

  trasformaArrayEventiPersonalizzati(obsVisite: Observable<EventoPersonalizzatoDTO[]>): Observable<EventoPersonalizzato[]> {
    //aggiungo agli evPersonalizzati le informazioni sugli animali
    return obsVisite.pipe(
      // tap(evPersonalizzati => {
      //   console.log("Eventi Personalizzati ricevuti: ");
      //   console.table(evPersonalizzati);
      // }),
      //tolgo eventi a cui non corrispondono un vero animale
      map(evPersonalizzati => evPersonalizzati.filter(evPers => this.serviceAnimale.getAnimale(evPers.idAnimale))),
      // tap(evPersonalizzati => {
      //   console.log("EventiPersDTO filtrati da quelli che non corrispondono con un animale: ");
      //   console.table(evPersonalizzati);
      // }),
      //trasforma da tipo EventoPersonalizzatoDTO[] a EventoPersonalizzato[]
      map(evPersonalizzati => {
        return evPersonalizzati
          .map((eventoPersonalizzatoDTO: EventoPersonalizzatoDTO) => {
            let animale: Animale = this.serviceAnimale.getAnimale(eventoPersonalizzatoDTO.idAnimale) as Animale;
            let ev = new EventoPersonalizzato();
            ev.id = eventoPersonalizzatoDTO.id;
            ev.data = new Date(eventoPersonalizzatoDTO.data);
            ev.testo = eventoPersonalizzatoDTO.testo;
            ev.animale = animale;
            this.setImmagineEvPers(ev);
            return ev;
          });
      }),
      // tap(evPersonalizzati => console.log("Eventi trasformati: " + evPersonalizzati.length)),
      // tap(evPersonalizzati => {
      //   console.log("Eventi trasformati: ");
      //   console.table(evPersonalizzati);
      // }),
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
    // console.log("Url per prendere l'immagine dell'evento personalizzato: " + url);
    return url;
  }

  setImmagineEvPers(ev: EventoPersonalizzato) {
    let idEv = ev.id;
    let urlOrNull = this.getUrlImmagineEvPers(idEv);
    if (urlOrNull) {
      this.http.get(urlOrNull, {responseType: 'blob'}).subscribe({
        next: (immagine) => {
          // console.log("Creo url immagine da visualizzare");
          let objectURL = URL.createObjectURL(immagine);
          ev.urlImmagine = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          ev.haImmagine = true;

        },
        error: (err) => {
          if (err.status == 404) {
            console.log("Nessuna immagine per l'evento personalizzato");
            ev.haImmagine = false;
            ev.urlImmagine = null;
          } else {
            ev.haImmagine = false;
            console.error(err);
          }
        }
      });
    }
  }

  postEventoPersonalizzato(eventoPer: EventoPersonalizzato, file?: File) {
    if(eventoPer.animale) {
      let params = new FormData();
      if(eventoPer.testo != "") params.append('testo', eventoPer.testo!);
      if(eventoPer.data) params.append('data', formatDate(eventoPer.data,"yyyy-MM-dd'T'HH:mm", "en-US"));
      else params.append('data', formatDate(new Date(Date.now()),"yyyy-MM-dd'T'HH:mm", "en-US"));
      if (eventoPer.haImmagine && file) {
        params.append('immagine', file);
      }
      return this.http.post<number>(`${GestoreEventiPersonalizzatiService.basicUrl}/pushEventoPersonalizzato/${eventoPer.animale!.id}`, params);
    } else {
      throw new Error("Non è stato selezionato alcun animale");
    }
  }
}
