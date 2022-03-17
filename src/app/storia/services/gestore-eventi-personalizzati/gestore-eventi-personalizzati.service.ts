import { Injectable } from '@angular/core';
import {EventoPersonalizzato} from "../../models/evento-personalizzato";
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {Visita} from "../../../ospedale/models/visita";
import {Animale} from "../../../ospedale/models/animale";
import {VisitaDTO} from "../../../ospedale/services/gestore-visite/gestore-visite.service";
import {GestoreAnimaliService} from "../../../ospedale/services/gestore-animali/gestore-animali.service";

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
  ) { }

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
    return this.trasformArrayEventiPersonalizzati(this.http.get<EventoPersonalizzatoDTO[]>(url));
  }

  trasformArrayEventiPersonalizzati(obsVisite: Observable<EventoPersonalizzatoDTO[]>): Observable<EventoPersonalizzato[]> {
  //aggiungo alle evPersonalizzati le informazioni sugli animali
  return obsVisite.pipe(
    // tap(evPersonalizzati => console.log("Visite ricevute: " + evPersonalizzati.length)),
    map(evPersonalizzati => evPersonalizzati.filter(evPers => this.serviceAnimale.getAnimale(evPers.idAnimale))),
    // tap(evPersonalizzati => console.log("Visite filtrate: " + evPersonalizzati.length)),
    //trasforma da tipo EventoPersonalizzatoDTO[] a EventoPersonalizzato[]
    map(evPersonalizzati => {
      return evPersonalizzati
        .filter(evPers => this.serviceAnimale.getAnimale(evPers.idAnimale))
        .map((evPers: EventoPersonalizzatoDTO) => {
          let animale: Animale = this.serviceAnimale.getAnimale(evPers.idAnimale) as Animale;
          let ev = new EventoPersonalizzato();
          ev.id = evPers.id;
          ev.data = new Date(evPers.data);
          ev.testo = evPers.testo;
          ev.animale = animale;
          return ev;
        });
    }),
    // tap(evPersonalizzati => console.log("Eventi trasformati: " + evPersonalizzati.length)),
    // tap(evPersonalizzati => evPersonalizzati.forEach(evPers => {
    //   console.log("Eventi data: ");
    //   console.log(evPers.data!.getTime());
    // })),
    //ordino le evPersonalizzati per data in ordine decrescente
    map(evPersonalizzati => {
      evPersonalizzati.sort((a: EventoPersonalizzato, b: EventoPersonalizzato) =>
        ((b.data ? b.data.getTime() : 0) - (a.data ? a.data.getTime() : 0)));
      return evPersonalizzati;
    }),
    // tap(evPersonalizzati => {
    //   console.log("Eventi ordinati:");
    //   evPersonalizzati.forEach(evPers => console.log(evPers));
    // }),
  );
}
}
