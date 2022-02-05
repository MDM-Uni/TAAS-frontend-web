import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GestoreAnimaliService {

  constructor(private http: HttpClient) {
  }

  getAnimali() {
    return this.http.get<{animaleId: number, nome: string}[]>("assets/animaliIds.json");
  }
}
