import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarrelliService {
  baseUrl = "http://localhost:8082/api/v1/carrelli"

  constructor(private http: HttpClient) {
    this.http = http
  }
  aggiungiAlCarrello(id: number, quantita: number) {
    throw new Error('not implemented')
    this.http.get<string>(`${this.baseUrl}/:idCarrello/prodotti/${id}/aggiungi/${quantita}`)
  }
}
