import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarrelliService {
  baseUrl = environment.negozioEndpoint + "/carrelli"

  constructor(private http: HttpClient) {
    this.http = http
  }
  aggiungiAlCarrello(id: number, quantita: number) {
    throw new Error('not implemented')
    this.http.get<string>(`${this.baseUrl}/:idCarrello/prodotti/${id}/aggiungi/${quantita}`)
  }
}
