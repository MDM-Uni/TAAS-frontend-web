import { Injectable } from '@angular/core';
import * as Http from "http";
import {HttpClient} from "@angular/common/http";
import { Utente } from './utente';
import {Observable} from "rxjs";
import {Animale} from "./animale";

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private apiServerUrl = 'localhost:8080';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<Utente[]>{
    return this.http.get<Utente[]>(this.apiServerUrl +'/users');
  }

  public getUser(utente: Utente) : Observable<Utente>{
    return this.http.get<Utente>(this.apiServerUrl +'/user/' + utente.email + '/' + utente.nome);
  }

  public updateAnimal(utente: Utente, animale: Animale) : Observable<Animale>{
    return this.http.put<Animale>(this.apiServerUrl + '/updateAnimal/' + utente.id + '/' + animale.id, animale);
  }

  public addAnimal(utente: Utente, animale: Animale) : Observable<Utente>{
    return this.http.put<Utente>(this.apiServerUrl + '/addAnimal/' + utente.id, animale);
  }

  public deleteAnimal(utente: Utente, animale: Animale) : Observable<Utente>{
    return this.http.delete<Utente>(this.apiServerUrl + '/removeAnimal/' + animale.id);
  }

}
