import { Injectable } from '@angular/core';
import {Visita} from "../../models/visita";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Evento} from "../../models/evento";
import {map, Observable, tap} from "rxjs";
import {GestoreAnimaliService} from "../gestore-animali/gestore-animali.service";
import {Animale} from "../../models/animale";
import {formatDate} from '@angular/common';
import {HotToastService} from "@ngneat/hot-toast";

type VisitaDTO = { tipoVisita: string, data: string, durataInMinuti: number, note: string, id: number, idAnimale: number };

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
    return this.http.post<number>("http://localhost:8081/ospedale/pushVisita", visita);
  }

  deleteVisita(visitaDaEliminare: Visita) {
    return this.http.post("http://localhost:8081/ospedale/deleteVisita", visitaDaEliminare);
  }

  getVisite(idAnimale?: number, tipoVisita?: string): Observable<VisitaDTO[]> {
    //creo l'url corretto
    let params = new HttpParams()
    let baseURL: string = "http://localhost:8081/ospedale/getVisite";
    if (idAnimale)
      params = params.set("idAnimale", idAnimale)
    if (tipoVisita)
      params = params.set("tipoVisita", tipoVisita)
    const fullURL = `${baseURL}?${params.toString()}`;
    console.log(fullURL);

    return this.http.get<VisitaDTO[]>(fullURL);
  }

  getEventi() {
    //todo aggiungere la chiamata a getOrdini
    //todo aggiungere la chiamata a getVisite
  }
}
