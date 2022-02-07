import { Injectable } from '@angular/core';
import {Visita} from "../../models/visita";
import {HttpClient} from "@angular/common/http";
import {Evento} from "../../models/evento";
import {map, Observable} from "rxjs";
import {GestoreAnimaliService} from "../gestore-animali/gestore-animali.service";

@Injectable({
  providedIn: 'root'
})
export class GestoreEventiService {
  eventi!: Observable<Evento[]>;
  visite!: Observable<Visita[]>;

  constructor(
    private http: HttpClient,
    private serviceAnimali: GestoreAnimaliService,
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
    let visite_senza_animali = this.http.get<{tipoVisita:string, data: Date, durataInMinuti: number, note: string, id: number, idAnimale: number}[]>("http://localhost:8080/ospedale/getVisite");
    //aggiungo alle visite le informazioni sugli animali
    this.visite = visite_senza_animali.pipe(
      map((visite: {tipoVisita:string, data: Date, durataInMinuti: number, note: string, id: number, idAnimale: number}[]) => {
        let v = visite.map((visita) => {
          return new Visita(visita.tipoVisita, visita.data, visita.durataInMinuti, visita.note, visita.id, this.serviceAnimali.getAnimale(visita.idAnimale));
        });
        console.log(v);
        return v;
      })
    );
    return this.visite
  }

  getEventi() {
    //todo aggiungere la chiamata a getOrdini
    //todo aggiungere la chiamata a getVisite
  }
}
