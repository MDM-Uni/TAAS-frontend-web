import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Prodotto} from "../model/prodotto";

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {
  baseUrl = "http://localhost:8080/api/v1/prodotti"

  constructor(private http: HttpClient) {
    this.http = http
  }

  getProdotti(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(this.baseUrl)
  }

  getProdotto(id: number): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`${this.baseUrl}/${id}`)
  }

  getUrlImmagineProdotto(id: number): string {
    return `${this.baseUrl}/${id}/immagine`
  }
}
