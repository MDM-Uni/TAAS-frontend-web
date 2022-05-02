import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {AnimaleOrdine, Ordine} from "../model/ordine";
import {GestoreUtenteService} from "../../storia/services/gestore-utente/gestore-utente.service";
import {OrdinePerEventi} from "src/app/storia/models/ordine-per-eventi";

@Injectable({
  providedIn: 'root'
})
export class OrdiniService {
  baseUrl = environment.negozioEndpoint + "/ordini"

  constructor(
    private http: HttpClient,
    private utenteService: GestoreUtenteService,
  ) {
  }

  getOrdini(idUtente: number): Observable<Array<AnimaleOrdine>> {
    return this.http.get<Array<AnimaleOrdine>>(`${this.baseUrl}/${idUtente}`)
  }

  getOrdiniAnimale(idUtente: number, idAnimale: number): Observable<Ordine> {
    return this.http.get<Ordine>(`${this.baseUrl}/${idUtente}/${idAnimale}`)
  }

  creaOrdine(idCarrello: number, idIndirizzo: number, idAnimale: number): Observable<Ordine> {
    let body = new FormData()
    body.set('idCarrello', idCarrello.toString())
    body.set('idIndirizzo', idIndirizzo.toString())
    body.set('idAnimale', idAnimale.toString())
    return this.http.post<Ordine>(`${this.baseUrl}/crea`, body)
  }

  annullaOrdine(idOrdine: number): Observable<any> {
    let body = new FormData()
    body.set('idOrdine', idOrdine.toString())
    return this.http.post<any>(`${this.baseUrl}/annulla`, body)
  }

  trasformaOrdiniPerEventi(ordiniObs: Observable<AnimaleOrdine[]>, idAnimale?: number): Observable<OrdinePerEventi[]> {
    return ordiniObs.pipe(
      // tap(ordini => {
      //   console.log("Numero ordini ricevuti: " + ordini.length);
      // }),
      map((animaleOrdineList) => {
        let ordini: OrdinePerEventi[] = [];
        let animali = this.utenteService.getUtenteLoggato().animali;
        //converto da Ordine a OrdinePerEventi, ricostruendo anche l'animale
        for (let animOrd of animaleOrdineList) {
          let animale = animali.find((a) => a.id == animOrd.animale.id);
          if (animale && (!idAnimale || animale.id == idAnimale)) {
            let ordine = new OrdinePerEventi(animOrd.ordine.id, animale, new Date(animOrd.ordine.dataAcquisto), animOrd.ordine.dataConsegna!=null ? new Date(animOrd.ordine.dataConsegna) : null, animOrd.ordine.prodotti, animOrd.ordine.indirizzoConsegna, animOrd.ordine.numeroArticoli, animOrd.ordine.totale);
            ordini.push(ordine);
          }
        }
        return ordini;
      }),
      // tap(ordini => {
      //   console.log(`Numero ordini convertiti da Ordine a OrdinePerEventi e filtrati per idAnimale(${idAnimale}): ` + ordini.length);
      // }),
    );
  }

}
