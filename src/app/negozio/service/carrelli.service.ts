import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Carrello} from "../model/carrello";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarrelliService {
  baseUrl = environment.negozioEndpoint + "/carrelli"

  constructor(private http: HttpClient) {
    this.http = http
  }

  getCarrello(id: number): Observable<Carrello> {
    return this.http.get<Carrello>(`${this.baseUrl}/${id}`)
  }

  aggiungiAlCarrello(idCarrello: number, idProdotto: number, quantita: number): Observable<Carrello> {
    let body = new FormData();
    body.set("idProdotto", idProdotto.toString())
    body.set("quantita", quantita.toString())
    return this.http.post<Carrello>(`${this.baseUrl}/${idCarrello}/aggiungi`,body)
  }

  rimuoviDalCarrello(idCarrello: number, idProdotto: number, quantita: number): Observable<Carrello> {
    let body = new FormData();
    body.set("idProdotto", idProdotto.toString())
    body.set("quantita", quantita.toString())
    return this.http.post<Carrello>(`${this.baseUrl}/${idCarrello}/rimuovi`,body)
  }
}
