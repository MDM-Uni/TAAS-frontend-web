import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ordine} from "../model/ordine";

@Injectable({
  providedIn: 'root'
})
export class OrdiniService {
  baseUrl = environment.negozioEndpoint + "/ordini"

  constructor(private http: HttpClient) {
    this.http = http
  }

  getOrdini(idUtente: number): Observable<Array<Ordine>> {
    return this.http.get<Array<Ordine>>(`${this.baseUrl}/${idUtente}`)
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
}
