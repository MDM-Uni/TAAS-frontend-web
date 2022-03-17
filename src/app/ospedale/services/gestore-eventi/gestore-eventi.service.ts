import { Injectable } from '@angular/core';
import {Visita} from "../../models/visita";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Evento} from "../../models/evento";
import {concatAll, map, Observable, of, reduce, tap} from "rxjs";
import {GestoreAnimaliService} from "../gestore-animali/gestore-animali.service";
import {Animale} from "../../models/animale";
import {formatDate} from '@angular/common';
import {HotToastService} from "@ngneat/hot-toast";
import {GestoreVisiteService} from "../gestore-visite/gestore-visite.service";
import {
  GestoreEventiPersonalizzatiService
} from "../../../storia/services/gestore-eventi-personalizzati/gestore-eventi-personalizzati.service";


@Injectable({
  providedIn: 'root'
})
export class GestoreEventiService {
  constructor(
    private http: HttpClient,
    private gestoreVisite: GestoreVisiteService,
    private gestoreEventiPersonalizzati: GestoreEventiPersonalizzatiService,
  ) { }


  getEventi(idAnimale?: number): Observable<Evento[]> {
    let eventiPersonalizzati = this.gestoreEventiPersonalizzati.getEventiPersonalizzati(idAnimale);
    let visite = this.gestoreVisite.trasformArrayVisite(this.gestoreVisite.getVisite(idAnimale));

    return of(eventiPersonalizzati, visite).pipe(
      concatAll(),
      map(eventi => {
        return eventi.map(evento => <Evento>evento);
      }),
      tap(eventi => console.log(eventi.length)),
      reduce((eventi1, eventi2) => {
        return [...eventi1, ...eventi2]
          .sort((ev1, ev2) => (ev2.data ? ev2.data.getTime() : 0) - (ev1.data ? ev1.data.getTime() : 0));
      }),
    );
    //todo aggiungere la chiamata a getOrdini

  }
}
