import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {UtenteService} from "../../service/utente.service";
import {Animale} from "../../model/animale";
import {Utente} from "../../model/utente";
import {ModalDismissReasons, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

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

  @Input() updateAnimal : EventEmitter<Animale> = new EventEmitter<Animale>();
  @Input() addA : EventEmitter<Utente> = new EventEmitter<Utente>();


  constructor(
    private router: Router,
    private utenteService: UtenteService,
  ) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('auth');
    if(storage){
      this.userDetails = JSON.parse(storage);
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

  public deleteAnimal(animale: Animale): void {
    this.utenteService.deleteAnimal(this.utente,animale).subscribe(data => {
        let index = this.utente.animali.indexOf(animale)
        this.utente.animali.splice(index,1)
      },
        err => {console.log(err)})
  }

  onSelect(animale: Animale) {
    this.animaleSelezionato = animale;
  }

  updateAnimalD(event: Animale){
    let index = this.utente.animali.indexOf(this.animaleSelezionato)
    this.utente.animali.splice(index,1)
    this.utente.animali.push(event)
  }

  addAnimalD(event: Utente){
    this.utente.animali = event.animali;
  }

}
