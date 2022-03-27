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
import {FormGroup} from "@angular/forms";
import {EventoPersonalizzato} from "../../models/evento-personalizzato";


@Injectable({
  providedIn: 'root'
})
export class GestoreEventiService {

  getEventi(filterForm: FormGroup): Observable<Evento[]> {
    let visite = of(<Visita[]>[]);
    let eventiPersonalizzati = of(<EventoPersonalizzato[]>[]);
    let tipoEvento = filterForm.get('tipoEvento')?.value;
    if (tipoEvento === '' || tipoEvento === 'visita') {
      visite = this.gestoreVisite.trasformaArrayVisite(this.gestoreVisite.getVisite(filterForm.get('idAnimale')?.value, filterForm.get('tipoVisita')?.value)).pipe(
        catchError(err => of(<Visita[]>[])),
      );
    }
    if (tipoEvento === '' || tipoEvento === 'evento-personalizzato') {
      eventiPersonalizzati = this.gestoreEventiPersonalizzati.getEventiPersonalizzati(filterForm.get('idAnimale')?.value).pipe(
        catchError(err => of(<EventoPersonalizzato[]>[])),
      );
    }


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
