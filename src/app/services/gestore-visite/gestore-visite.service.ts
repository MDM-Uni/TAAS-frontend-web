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
    this.http.post("http://localhost/ospedale/pushVisita", visita).subscribe(
      (dataOnSuccess: any) => {
        console.log(dataOnSuccess);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
