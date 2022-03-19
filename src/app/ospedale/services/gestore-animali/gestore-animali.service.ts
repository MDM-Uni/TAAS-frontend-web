import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {Animale} from "../../models/animale";
@Injectable({
  providedIn: 'root'
})
export class GestoreAnimaliService{

  animali!: Observable<Animale[]>;
  animaliMap: Map<number, Animale> = new Map<number, Animale>();

  constructor(private http: HttpClient) {
  }

  getAnimali(): Observable<Animale[]> {
    this.animali = this.http.get<Animale[]>("assets/animali-IDs-mock.json");
    this.animali.subscribe(animali => {
      animali.forEach(animale => {
        this.animaliMap.set(animale.id, animale);
      });
    });
    return this.animali;
  }

  getAnimale(idAnimale: number) {
    let animale = this.animaliMap.get(idAnimale);

    if (animale === undefined) {
      console.log(`Animale non trovato ${animale}`);
      return false;
    }
    return animale;
  }

}
