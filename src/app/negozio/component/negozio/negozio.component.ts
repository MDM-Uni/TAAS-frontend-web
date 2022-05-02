import { Component, OnInit } from '@angular/core';
import {CarrelliService} from "../../service/carrelli.service";
import {environment} from "../../../../environments/environment";
import {Utente} from "../../../utente/model/utente";

@Component({
  selector: 'app-negozio',
  templateUrl: './negozio.component.html',
  styleUrls: ['./negozio.component.css']
})
export class NegozioComponent implements OnInit {
  private utente: Utente;
  numArticoliCarrello: number | undefined;

  constructor(private carrelliService: CarrelliService) {
    this.utente = JSON.parse(localStorage.getItem('utente')!);
    this.aggiornaNumArticoliCarrello()
  }

  ngOnInit(): void {
  }

  aggiornaNumArticoliCarrello() {
    this.carrelliService.getCarrello(this.utente.id).subscribe((carrello) => this.numArticoliCarrello = carrello.numeroArticoli)
  }
}
