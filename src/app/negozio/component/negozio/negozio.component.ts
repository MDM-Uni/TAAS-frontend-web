import { Component, OnInit } from '@angular/core';
import {CarrelliService} from "../../service/carrelli.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-negozio',
  templateUrl: './negozio.component.html',
  styleUrls: ['./negozio.component.css']
})
export class NegozioComponent implements OnInit {
  numArticoliCarrello: number | undefined;

  constructor(private carrelliService: CarrelliService) {
    this.aggiornaNumArticoliCarrello()
  }

  ngOnInit(): void {
  }

  aggiornaNumArticoliCarrello() {
    this.carrelliService.getCarrello(environment.mockUserId).subscribe((carrello) => this.numArticoliCarrello = carrello.numeroArticoli)
  }
}
