import { Injectable } from '@angular/core';
import {Utente} from "../../../utente/model/utente";

@Injectable({
  providedIn: 'root'
})
export class GestoreUtenteService {

  constructor() { }

  getUtenteLoggato() {
    let utente_string = localStorage.getItem('utente');
    if (utente_string) {
      var utente: Utente = JSON.parse(utente_string);
    } else {
      throw "Utente non in sessione";
    }
    return utente;
  }
}
