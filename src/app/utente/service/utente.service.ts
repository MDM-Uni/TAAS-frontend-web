import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Utente } from '../model/utente';
import {Observable} from "rxjs";
import {Animale} from "../model/animale";


@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getUser(utente: Utente) : Observable<Utente>{
    return this.http.get<Utente>(this.apiServerUrl +'/user/' + utente.email + '/' + utente.nome, {withCredentials: true});
  }

  public updateAnimal(utente: Utente,animale: Animale, animaleAggiornato: Animale) : Observable<Animale>{
    return this.http.put<Animale>(this.apiServerUrl + '/updateAnimal/' + animale.id, animaleAggiornato, {withCredentials: true});
  }

  public addAnimal(utente: Utente, animale: Animale) : Observable<Utente>{
    return this.http.post<Utente>(this.apiServerUrl + '/addAnimal', animale, {withCredentials: true});
  }

  public deleteAnimal(utente: Utente, animale: Animale) : Observable<String> {
    return this.http.delete<String>(this.apiServerUrl + '/removeAnimal/' + animale.id, {withCredentials: true});
  }

}
