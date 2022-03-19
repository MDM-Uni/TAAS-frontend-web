import {Component, OnInit} from '@angular/core';
import {Modal} from "bootstrap";
import {Prodotto} from "../../model/prodotto";
import {ProdottiService} from "../../service/prodotti.service";
import {CarrelliService} from "../../service/carrelli.service";
import {Carrello} from "../../model/carrello";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-prodotto-modal',
  templateUrl: './prodotto-modal.component.html',
  styleUrls: ['./prodotto-modal.component.css']
})
export class ProdottoModalComponent implements OnInit {
  prodotto: Prodotto | undefined
  carrello: Carrello | undefined
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
    this.carrelliService.getCarrello(environment.mockUser)
      .subscribe((carrello) => this.carrello = carrello)
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
    this.carrelliService.aggiungiAlCarrello(this.carrello!.id, this.prodotto!.id, this.quantita)
      .subscribe((carrello) => window.alert(carrello))
  }
}
