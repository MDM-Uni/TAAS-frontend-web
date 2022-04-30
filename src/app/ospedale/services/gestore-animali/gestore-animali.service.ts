import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subscription} from "rxjs";
import {Animale} from "../../models/animale";
import {Utente} from "../../../utente/model/utente";
@Injectable({
  providedIn: 'root'
})
export class GestoreAnimaliService{

  animali!: Animale[];

  constructor(private http: HttpClient) {
  }

  getAnimaliUtente(): Animale[] {
    let utente_string = localStorage.getItem('utente');
    if (utente_string) {
      let utente: Utente = JSON.parse(utente_string);
      this.animali = utente.animali;
    } else {
      throw "Utente non in sessione";
    }
    return this.animali;
  }

  getAnimale(idAnimale: number) {
    let animali = this.getAnimaliUtente();
    let animale = animali.find(animale => animale.id === idAnimale);
    if (animale)
      return animale;
    else
      throw "Animale non dell'utente";
  }

}
