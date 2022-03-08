import {Component, OnInit} from '@angular/core';
import {Modal} from "bootstrap";
import {Prodotto} from "../../model/prodotto";
import {ProdottiService} from "../../service/prodotti.service";

@Component({
  selector: 'app-prodotto-modal',
  templateUrl: './prodotto-modal.component.html',
  styleUrls: ['./prodotto-modal.component.css']
})
export class ProdottoModalComponent implements OnInit {
  prodotto: Prodotto | undefined
  private modal: any
  private service

  constructor(service: ProdottiService) {
    this.service = service
  }

  ngOnInit(): void {
    this.modal = new Modal(document.getElementById("modalDettagliProdotto") as Element)
  }

  openModal(prodotto: Prodotto) {
    this.prodotto = prodotto
    this.modal?.show()
  }

  closeModal() {
    this.prodotto = undefined
    this.modal?.hide()
  }


  getUrlImmagineProdotto(id: number | undefined) {
    return this.service.getUrlImmagineProdotto(id!)
  }
}
