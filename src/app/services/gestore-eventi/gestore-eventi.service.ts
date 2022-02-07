import { Injectable } from '@angular/core';
import {Visita} from "../../models/visita";
import {HttpClient} from "@angular/common/http";
import {Evento} from "../../models/evento";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GestoreEventiService {
  eventi!: Observable<Evento[]>;
  visite!: Observable<Visita[]>;

  constructor(
    private http: HttpClient,
  ) { }

  postVisita(visita: Visita) {
    this.http.post("http://localhost:8080/ospedale/pushVisita", visita).subscribe(
      (_: any) => {
        console.log("Visita inviata con successo");
      },
      (error: any) => {
        console.log("Errore nell'invio della visita");
        console.log(error);
      }
    );
  }

  getVisite(): Observable<Visita[]> {
    this.visite = this.http.get<Visita[]>("http://localhost:8080/ospedale/getVisite");
    return this.visite
  }

  getEventi() {
    //todo aggiungere la chiamata a getOrdini
    //todo aggiungere la chiamata a getVisite
  }
}
