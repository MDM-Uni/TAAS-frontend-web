import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UtenteService} from "../utente.service";
import {Animale} from "../animale";
import {Utente} from "../utente";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userDetails: any;
  public utente : Utente;
  public animaleSelezionato: Animale;
  public animali: Animale[];

  constructor(
    private router: Router,
    private utenteService: UtenteService,
  ) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');
    if(storage){
      this.userDetails = JSON.parse(storage);
      console.log(this.userDetails);
      let user = new Utente(0,this.userDetails.name,this.userDetails.email,this.animali);
      this.getUser(user);
    } else { this.signOut();}
  }

  signOut(): void {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/login').then();
  }

  public getUser(utente: Utente): void {
    this.utenteService.getUser(utente).subscribe(
      (response) => {
        this.utente = response;
      },
      (err) => {
        alert(err.message);
      }
    )
  }

  public addAnimal(animale: Animale): void {
    this.utenteService.addAnimal(this.utente,animale).subscribe(
      (response) => {
        this.utente = response;
      },
      (err) => {
        alert(err.message);
      }
    )
  }

  public deleteAnimal(animale: Animale): void {
    this.utenteService.deleteAnimal(this.utente,animale).subscribe(data => {
        this.utente.animali.forEach((element,index) => {
          if(element.id === animale.id) delete this.utente.animali[index];
          window.location.reload();
        })
      },
        err => {console.log(err)})
  }

  onSelect(animale: Animale) {
    this.animaleSelezionato = animale;
  }

}
