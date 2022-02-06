import { Injectable } from '@angular/core';
import {Visita} from "../../models/visita";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GestoreVisiteService {

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
}
