import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Utente } from './utente';
import {Observable} from "rxjs";
import {Animale} from "./animale";


@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getUser(utente: Utente) : Observable<Utente>{
    return this.http.get<Utente>(this.apiServerUrl +'/user/' + utente.email + '/' + utente.nome);
  }

  public updateAnimal(utente: Utente,animale: Animale, animaleAggiornato: Animale) : Observable<Object>{
    return this.http.put<Animale>(this.apiServerUrl + '/updateAnimal/' + utente.id + '/' + animale.id, animaleAggiornato);
  }

  public addAnimal(utente: Utente, animale: Animale) : Observable<Utente>{
    return this.http.post<Utente>(this.apiServerUrl + '/addAnimal/' + utente.id, animale);
  }

  public deleteAnimal(utente: Utente, animale: Animale) : Observable<String> {
    return this.http.delete<String>(this.apiServerUrl + '/removeAnimal/' + utente.id + "/" + animale.id);
  }

}
