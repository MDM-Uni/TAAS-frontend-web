import { Component, OnInit } from '@angular/core';
import {ProdottiService} from "../../service/prodotti.service";

@Component({
  selector: 'app-negozio-homepage',
  templateUrl: './negozio-homepage.component.html',
  styleUrls: ['./negozio-homepage.component.css']
})
export class NegozioHomepageComponent implements OnInit {
  prodotti
  service

  constructor(service: ProdottiService) {
    this.service = service
    this.prodotti = service.getProdotti()
  }

  ngOnInit(): void {
  }

  getUrlImmagineProdotto(id: number): string {
    return this.service.getUrlImmagineProdotto(id)
  }
}
