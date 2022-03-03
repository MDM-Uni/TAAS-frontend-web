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
    private serviceAnimali: GestoreAnimaliService,
    private toast: HotToastService
  ) { }

  postVisita(visita: Visita) {
    this.http.post("http://localhost:8080/ospedale/pushVisita", visita).pipe(
      this.toast.observe({
         loading: 'Sto verificando la disponibilità...',
         success: 'Visita registrata con successo!',
         error: 'Qualcosa è andato storto!'
      })
    ).subscribe(
      (_: any) => {
        console.log("Visita inviata con successo");
        this.visite = this.visite.pipe(
          map(visite => {
            //inserisco nel posto giusto la visita
            let i = 0;
            let cont = true;
            while (cont && i < visite.length) {
              if (visita.data > visite[i].data) {
                visite = visite.splice(i, 0, visita);
                cont=false;
              }
              i++;
            }
            return visite;
          }),
        )
      },
      (error: any) => {
        console.log("Errore nell'invio della visita");
        console.log(error);
      }
    );
  }

  deleteVisita(visitaDaEliminare: Visita) {
    this.http.post("http://localhost:8080/ospedale/deleteVisita", visitaDaEliminare).pipe(
      this.toast.observe({
         loading: 'Sto eliminando la visita...',
         success: 'Visita eliminata con successo!',
         error: 'Qualcosa è andato storto!'
      })
    ).subscribe({
      next: (_: any) => {
        console.log("Visita eliminata con successo");
        this.visite = this.visite.pipe(
          map((visite) => visite.filter((visita) => visita.id !== visitaDaEliminare.id))
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
      //trasforma da tipo VisitaDTO[] a Visita[]
      map(visite => {
        return visite
          .filter(visita => this.serviceAnimali.getAnimale(visita.idAnimale))
          .map((visita:VisitaDTO) => {
            let animale: Animale = this.serviceAnimali.getAnimale(visita.idAnimale) as Animale;
            return new Visita(visita.tipoVisita, new Date(visita.data), visita.durataInMinuti, visita.note, visita.id, animale);
          });
      }),
      tap(visite => console.log("Visite trasformate da VisitaDTO[] a Visita[]: " + visite.length)),
      tap(visite => visite.forEach(visita => {
        console.log("Visite: ");
        console.log(visita.data.getTime());
      })),
      //ordino le visite per data in ordine decrescente
      map(visite => {
        visite.sort((a:Visita, b:Visita) => (b.data.getTime() - a.data.getTime()));
        return visite;
      }),
      tap(visite => {
        console.log("Visite ordinate:");
        visite.forEach(visita => console.log(visita));
      }),
    );
    return this.visite;
  }

  getEventi() {
    //todo aggiungere la chiamata a getOrdini
    //todo aggiungere la chiamata a getVisite
  }
}
