import { Injectable } from '@angular/core';
import {Visita} from "../../../ospedale/models/visita";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Evento} from "../../../generale/models/evento";
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
import {GestoreUtenteService} from "../gestore-utente/gestore-utente.service";
import {environment} from "../../../../environments/environment";
import {OrdiniService} from "../../../negozio/service/ordini.service";
import {UtenteService} from "../../../utente/service/utente.service";
import {AnimaleOrdine, Ordine} from "../../../negozio/model/ordine";
import {OrdinePerEventi} from "../../models/ordine-per-eventi";
import {Utente} from "../../../utente/model/utente";


@Injectable({
  providedIn: 'root'
})
export class GestoreEventiService {

  utente: Utente;
  // filterForm del tipo simile { "idAnimale": number, "tipoEvento": string, "tipoVisita": string }
  constructor(
    private http: HttpClient,
    private gestoreVisite: GestoreVisiteService,
    private gestoreEventiPersonalizzati: GestoreEventiPersonalizzatiService,
    private gestoreAnimali: GestoreAnimaliService,
    private gestoreUtente: GestoreUtenteService,
    private ordiniService: OrdiniService,
  ) { }


  getEventi(filterForm: FormGroup): Observable<Evento[]> {
    this.utente = this.gestoreUtente.getUtenteLoggato();

    let visite = of(<Visita[]>[]);
    let eventiPersonalizzati = of(<EventoPersonalizzato[]>[]);
    let ordini = of(<OrdinePerEventi[]>[]);

    let tipoEvento = filterForm.get('tipoEvento')?.value; //tipoEvento=='' vuol dire tutti
    let listaAnimali = [];
    if (filterForm.get("idAnimale")!.value == 0) {//tutti gli animali dell'utente
      listaAnimali = this.gestoreAnimali.getAnimaliUtente();
    } else {
      listaAnimali.push(this.gestoreAnimali.getAnimale(filterForm.get("idAnimale")!.value));
    }
    if (tipoEvento === '' || tipoEvento === 'visita') {
      if (tipoEvento !== 'visita')
        filterForm.get('tipoVisita')!.setValue('');
      let visiteAnimaliObs = this.gestoreVisite.getVisiteAnimali(listaAnimali, filterForm.get('tipoVisita')!.value);
      visite = this.gestoreVisite.trasformaArrayVisite(visiteAnimaliObs).pipe(
        catchError(err => of(<Visita[]>[])),
      );
    }
    if (tipoEvento === '' || tipoEvento === 'evento-personalizzato') {
      let utente_loggato = this.gestoreUtente.getUtenteLoggato();
      eventiPersonalizzati = this.gestoreEventiPersonalizzati.getEventiPersonalizzatiUtente(utente_loggato.id, filterForm.get('idAnimale')!.value != 0 ? filterForm.get('idAnimale')!.value : undefined).pipe(
        catchError(err => of(<EventoPersonalizzato[]>[])),
      );
    }
    if(tipoEvento === '' || tipoEvento === 'ordine'){
      let idAnimale = filterForm.get('idAnimale')!.value;
      let ordiniObs;
      ordiniObs = this.ordiniService.getOrdini(this.utente.id);
      ordini = this.ordiniService.trasformaOrdiniPerEventi(ordiniObs, idAnimale!=0 ? idAnimale : undefined).pipe(
        catchError(err => of(<OrdinePerEventi[]>[])),
      );
    }


    return of(eventiPersonalizzati, visite, ordini).pipe(
      concatAll(),
      map(eventi => {
        return eventi.map(evento => <Evento>evento);
      }),
      reduce((eventi1, eventi2) => {
        return [...eventi1, ...eventi2];
      }),
      // tap(eventi => console.log("Numero eventi: " + eventi.length)),
      map(eventi => {
        return eventi.sort((ev1, ev2) => ( (ev2.getData()?.getTime() ?? 0) - (ev1.getData()?.getTime() ?? 0) ));
      }),
      // tap(eventi => {
      //   console.log("Date eventi ordinati");
      //   eventi.forEach(evento => {
      //       console.log(evento.getData()?.getTime() ?? 0);
      //     }
      //   );
      // }),
    );
  }
}
