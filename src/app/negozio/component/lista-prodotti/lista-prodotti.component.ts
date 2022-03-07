import { Component, OnInit } from '@angular/core';
import {ProdottiService} from "../../service/prodotti.service";

@Component({
  selector: 'app-lista-prodotti',
  templateUrl: './lista-prodotti.component.html',
  styleUrls: ['./lista-prodotti.component.css']
})
export class ListaProdottiComponent implements OnInit {
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
