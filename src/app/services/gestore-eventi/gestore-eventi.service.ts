import { Injectable } from '@angular/core';
import {Visita} from "../../models/visita";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Evento} from "../../models/evento";
import {map, Observable, tap} from "rxjs";
import {GestoreAnimaliService} from "../gestore-animali/gestore-animali.service";
import {Animale} from "../../models/animale";

type VisitaDTO = { tipoVisita: string, data: Date, durataInMinuti: number, note: string, id: number, idAnimale: number };

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
        this.visite = this.visite.pipe(
          map(visite => {
            return [...visite, visita];
          }),
        )
      },
      (error: any) => {
        console.log("Errore nell'invio della visita");
        console.log(error);
      }
    );
  }

  deleteVisita(id: number) {
    this.http.delete("http://localhost:8080/ospedale/deleteVisita/" + id).subscribe({
      next: (_: any) => {
        console.log("Visita eliminata con successo");
        this.visite = this.visite.pipe(
          map((visite) => visite.filter((visita) => visita.id !== id))
        );
      },
      error: (error: any) => {
        console.log("Errore nell'eliminazione della visita");
        console.log(error);
      }
    });
  }

  getVisite(idAnimale?: number, tipoVisita?: string): Observable<Visita[]> {
    //creo l'url corretto
    let params = new HttpParams()
    let baseURL: string = "http://localhost:8080/ospedale/getVisite";
    if (idAnimale)
      params = params.set("idAnimale", idAnimale)
    if (tipoVisita)
      params = params.set("tipoVisita", tipoVisita)
    const fullURL = `${baseURL}?${params.toString()}`;
    console.log(fullURL);

    let visite_senza_animali = this.http.get<VisitaDTO[]>(fullURL);
    //aggiungo alle visite le informazioni sugli animali
    this.visite = visite_senza_animali.pipe(
      tap(visite => console.log("Visite ricevute: " + visite.length)),
      map(visite => visite.filter(visita => this.serviceAnimali.getAnimale(visita.idAnimale))),
      tap(visite => console.log("Visite filtrate: " + visite.length)),
      map(visite => {
        return visite
          .filter(visita => this.serviceAnimali.getAnimale(visita.idAnimale))
          .map((visita) => {
            let animale: Animale = this.serviceAnimali.getAnimale(visita.idAnimale) as Animale;
            return new Visita(visita.tipoVisita, visita.data, visita.durataInMinuti, visita.note, visita.id, animale);
          });
      }),
      tap(visite => console.log("Visite trasformate da VisitaDTO[] a Visita[]: " + visite.length)),
    );
    return this.visite;
  }

  getEventi() {
    //todo aggiungere la chiamata a getOrdini
    //todo aggiungere la chiamata a getVisite
  }
}
