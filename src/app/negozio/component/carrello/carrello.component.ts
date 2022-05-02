import {Component, OnInit, ViewChild} from '@angular/core';
import {Carrello, ProdottoQuantita} from "../../model/carrello";
import {CarrelliService} from "../../service/carrelli.service";
import {environment} from "../../../../environments/environment";
import {OrdineModalComponent} from "../ordine-modal/ordine-modal.component";
import {Utente} from "../../../utente/model/utente";

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  private utente: Utente;
  carrello: Carrello | undefined
  @ViewChild(OrdineModalComponent) modalComponent: OrdineModalComponent | undefined

  constructor(carrelliService: CarrelliService) {
    this.utente = JSON.parse(localStorage.getItem('utente')!)
    carrelliService.getCarrello(this.utente.id).subscribe((carrello) => this.carrello = carrello)
  }

  ngOnInit(): void {
  }

  modificaQuantita(prodQuant: ProdottoQuantita) {
    return (n: number) => {
      let index = this.carrello!.prodotti.indexOf(prodQuant)

      let numModificati = n > 0 ? n : -Math.min(-n,prodQuant.quantita)
      prodQuant.quantita += numModificati
      this.carrello!.numeroArticoli += numModificati
      this.carrello!.totale += numModificati * prodQuant.prodotto.prezzo

      if (prodQuant.quantita <= 0)
        this.carrello?.prodotti.splice(index, 1)
    }
  }

  openModal() {
    this.modalComponent?.openModal(this.carrello!)
  }
}
