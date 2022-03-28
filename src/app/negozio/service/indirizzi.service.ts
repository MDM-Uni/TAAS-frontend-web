import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Indirizzo} from "../model/indirizzo";

@Injectable({
  providedIn: 'root'
})
export class IndirizziService {
  baseUrl = environment.negozioEndpoint + "/indirizzi"

  constructor(private http: HttpClient) {
    this.http = http
  }

  getIndirizzi(idUtente: number): Observable<Array<Indirizzo>> {
    return this.http.get<Array<Indirizzo>>(`${this.baseUrl}/${idUtente}`)
  }

  aggiungiIndirizzo(idUtente: number, indirizzo: Indirizzo): Observable<Indirizzo> {
    return this.http.post<Indirizzo>(`${this.baseUrl}/${idUtente}/aggiungi`, indirizzo)
  }

  rimuoviIndirizzo(idUtente: number, idIndirizzo: number): Observable<any> {
    let body = new FormData()
    body.set('idIndirizzo', idIndirizzo.toString())
    return this.http.post<Indirizzo>(`${this.baseUrl}/${idUtente}/rimuovi`, body)
  }
}
