import { Injectable } from '@angular/core';
import {Visita} from "../../../ospedale/models/visita";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Evento} from "../../../ospedale/models/evento";
import {catchError, concatAll, map, Observable, of, reduce, tap} from "rxjs";
import {GestoreAnimaliService} from "../../../ospedale/services/gestore-animali/gestore-animali.service";
import {Animale} from "../../../ospedale/models/animale";
import {formatDate} from '@angular/common';
import {HotToastService} from "@ngneat/hot-toast";
import {GestoreVisiteService} from "../../../ospedale/services/gestore-visite/gestore-visite.service";
import {
  GestoreEventiPersonalizzatiService
} from "../gestore-eventi-personalizzati/gestore-eventi-personalizzati.service";
import {onErrorResumeNext} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class GestoreEventiService {

  getEventi(idAnimale?: number): Observable<Evento[]> {
    let eventiPersonalizzati = this.gestoreEventiPersonalizzati.getEventiPersonalizzati(idAnimale).pipe(
      catchError(err => of([]))
    );
    let visite = this.gestoreVisite.trasformaArrayVisite(this.gestoreVisite.getVisite(idAnimale)).pipe(
      catchError(err => of([]))
    );

    return of(eventiPersonalizzati, visite).pipe(
      concatAll(),
      //todo aggiungere la chiamata a getOrdini
      map(eventi => {
        return eventi.map(evento => <Evento>evento);
      }),
      reduce((eventi1, eventi2) => {
        return [...eventi1, ...eventi2];
      }),
      // tap(eventi => console.log("Numero eventi: " + eventi.length)),
      map(eventi => {
        return eventi.sort((ev1, ev2) => ( (ev2.data?.getTime() ?? 0) - (ev1.data?.getTime() ?? 0) ));
      }),
      // tap(eventi => {
      //   console.log("Date eventi ordinati");
      //   eventi.forEach(evento => {
      //       console.log(evento.data?.getTime() ?? 0);
      //     }
      //   );
      // })
    );
  }


  constructor(
    private http: HttpClient,
    private gestoreVisite: GestoreVisiteService,
    private gestoreEventiPersonalizzati: GestoreEventiPersonalizzatiService,
  ) { }
}
