import {Component, OnInit} from '@angular/core';
import {Modal} from "bootstrap";
import {Prodotto} from "../../model/prodotto";
import {ProdottiService} from "../../service/prodotti.service";
import {CarrelliService} from "../../service/carrelli.service";
import {Carrello} from "../../model/carrello";
import {environment} from "../../../../environments/environment";
import {HotToastService} from "@ngneat/hot-toast";

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

  constructor(private prodottiService: ProdottiService,
              private carrelliService: CarrelliService,
              private toast: HotToastService) {
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
    this.carrelliService.aggiungiAlCarrello(this.carrello!.id, this.prodotto!.id, this.quantita).pipe(
      this.toast.observe({
        loading: "Attendi",
        success: 'Articolo aggiunto al carrello',
        error: 'C\'è stato un problema... l\'articolo non è stato aggiunto al carrello'
      })
    ).subscribe()
  }
}
