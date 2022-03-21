import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Visita} from "../../models/visita";
import {map, Observable} from "rxjs";
import {Animale} from "../../models/animale";
import {GestoreAnimaliService} from "../gestore-animali/gestore-animali.service";

export type VisitaDTO = { tipoVisita: string, data: string, durataInMinuti: number, note: string, id: number, idAnimale: number };

@Injectable({
  providedIn: 'root'
})
export class GestoreVisiteService {
  static basicUrl = 'http://localhost:8081/ospedale';

  constructor(
    private http: HttpClient,
    private serviceAnimali: GestoreAnimaliService,
  ) { }

  postVisita(visita: Visita) {
    return this.http.post<number>(GestoreVisiteService.basicUrl + "/pushVisita", visita);
  }

  deleteVisita(visitaDaEliminare: Visita) {
    return this.http.post(GestoreVisiteService.basicUrl + "/deleteVisita", visitaDaEliminare);
  }

  getVisite(idAnimale?: number, tipoVisita?: string): Observable<VisitaDTO[]> {
    //creo l'url corretto
    let params = new HttpParams();
    let baseURL: string = `${GestoreVisiteService.basicUrl}/getVisite`;
    if (idAnimale)
      params = params.set("idAnimale", idAnimale)
    if (tipoVisita)
      params = params.set("tipoVisita", tipoVisita)
    const fullURL = `${baseURL}?${params.toString()}`;
    //console.log(fullURL);

    return this.http.get<VisitaDTO[]>(fullURL);
  }

  trasformaArrayVisite(obsVisite: Observable<VisitaDTO[]>): Observable<Visita[]> {
    //aggiungo alle visite le informazioni sugli animali
    return obsVisite.pipe(
      // tap(visite => console.log("Visite ricevute: " + visite.length)),
      map(visite => visite.filter(visita => this.serviceAnimali.getAnimale(visita.idAnimale))),
      // tap(visite => console.log("Visite filtrate: " + visite.length)),
      //trasforma da tipo VisitaDTO[] a Visita[]
      map(visite => {
        return visite
          .filter(visita => this.serviceAnimali.getAnimale(visita.idAnimale))
          .map((visita: VisitaDTO) => {
            let animale: Animale = this.serviceAnimali.getAnimale(visita.idAnimale) as Animale;
            return new Visita(visita.tipoVisita, new Date(visita.data), visita.durataInMinuti, visita.note, visita.id, animale);
          });
      }),
      // tap(visite => console.log("Visite trasformate da VisitaDTO[] a Visita[]: " + visite.length)),
      // tap(visite => visite.forEach(visita => {
      //   console.log("Visite: ");
      //   console.log(visita.data.getTime());
      // })),

      //ordino le visite per data in ordine decrescente
      map(visite => {
        visite.sort((a: Visita, b: Visita) => (b.data.getTime() - a.data.getTime()));
        return visite;
      }),
      // tap(visite => {
      //   console.log("Visite ordinate:");
      //   visite.forEach(visita => console.log(visita));
      // }),
    );
  }


}
