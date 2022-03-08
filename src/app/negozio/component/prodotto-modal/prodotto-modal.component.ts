import {Component, OnInit} from '@angular/core';
import {Modal} from "bootstrap";
import {Prodotto} from "../../model/prodotto";

@Component({
  selector: 'app-prodotto-modal',
  templateUrl: './prodotto-modal.component.html',
  styleUrls: ['./prodotto-modal.component.css']
})
export class ProdottoModalComponent implements OnInit {
  modal: any
  prodotto: Prodotto | undefined

  constructor() { }

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


}
