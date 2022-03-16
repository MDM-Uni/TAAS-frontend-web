import {Component, OnInit} from '@angular/core';
import {Modal} from "bootstrap";
import {Prodotto} from "../../model/prodotto";
import {ProdottiService} from "../../service/prodotti.service";
import {CarrelliService} from "../../service/carrelli.service";

@Component({
  selector: 'app-prodotto-modal',
  templateUrl: './prodotto-modal.component.html',
  styleUrls: ['./prodotto-modal.component.css']
})
export class ProdottoModalComponent implements OnInit {
  prodotto: Prodotto | undefined
  quantita = 0
  private modal: any
  private prodottiService: ProdottiService
  private carrelliService: CarrelliService;


  constructor(prodottiService: ProdottiService, carrelliService: CarrelliService) {
    this.prodottiService = prodottiService
    this.carrelliService = carrelliService
  }

  ngOnInit(): void {
    this.modal = new Modal(document.getElementById("modalDettagliProdotto") as Element)
  }

  openModal(prodotto: Prodotto) {
    this.quantita = 0
    this.prodotto = prodotto
    this.modal?.show()
  }

  closeModal() {
    this.prodotto = undefined
    this.modal?.hide()
  }

  getUrlImmagineProdotto(id: number | undefined) {
    return this.prodottiService.getUrlImmagineProdotto(id!)
  }

  incrementaQuantita() {
    this.quantita++
  }

  decrementaQuantita() {
    if (this.quantita > 0)
      this.quantita--
  }

  aggiungiAlCarrello() {
    this.carrelliService.aggiungiAlCarrello(this.prodotto!.id, this.quantita)
  }
}
