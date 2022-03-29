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

  getAnimali(): Animale[] {
    // this.animali = this.http.get<Animale[]>("assets/animali-IDs-mock.json");
    // this.animali.subscribe(animali => {
    //   animali.forEach(animale => {
    //     this.animaliMap.set(animale.id, animale);
    //   });
    // });
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
    return this.animali.find(animale => animale.id === idAnimale);
  }

}
