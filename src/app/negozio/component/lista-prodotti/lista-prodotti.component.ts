import {Component, OnInit, ViewChild} from '@angular/core';
import {ProdottiService} from "../../service/prodotti.service";
import {ProdottoModalComponent} from "../prodotto-modal/prodotto-modal.component";
import {Prodotto} from "../../model/prodotto";

@Component({
  selector: 'app-lista-prodotti',
  templateUrl: './lista-prodotti.component.html',
  styleUrls: ['./lista-prodotti.component.css']
})
export class ListaProdottiComponent implements OnInit {
  LIST_MODE = false

  prodotti
  service

  @ViewChild(ProdottoModalComponent) modalComponent: ProdottoModalComponent | undefined

  constructor(service: ProdottiService) {
    this.service = service
    this.prodotti = service.getProdotti()
  }

  ngOnInit(): void {
  }

  getUrlImmagineProdotto(id: number): string {
    return this.service.getUrlImmagineProdotto(id)
  }

  openModal(prodotto: Prodotto) {
    this.modalComponent?.openModal(prodotto)
  }
}
