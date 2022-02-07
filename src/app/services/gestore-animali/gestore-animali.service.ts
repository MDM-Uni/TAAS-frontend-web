import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GestoreAnimaliService {

  animali!: Observable<Animale[]>;

  constructor(private http: HttpClient) {
  }

  getAnimali() {
    return this.http.get<Animale[]>("assets/animali-IDs-mock.json");
  }
}
