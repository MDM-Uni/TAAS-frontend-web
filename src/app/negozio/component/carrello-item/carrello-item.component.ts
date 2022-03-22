import {Component, Input, OnInit} from '@angular/core';
import {ProdottoQuantita} from "../../model/carrello";
import {ProdottiService} from "../../service/prodotti.service";
import {CarrelliService} from "../../service/carrelli.service";

@Component({
  selector: 'app-carrello-item',
  templateUrl: './carrello-item.component.html',
  styleUrls: ['./carrello-item.component.css']
})
export class CarrelloItemComponent implements OnInit {
  @Input() idCarrello: number | undefined
  @Input() prodQuant: ProdottoQuantita | undefined;
  @Input() callbackRimuoviProdotto: (() => void) | undefined
  quantita: number | undefined = 0
  private prodottiService: ProdottiService;
  private carrelliService: CarrelliService;

  constructor(prodottiService: ProdottiService, carrelliService: CarrelliService) {
    this.prodottiService = prodottiService
    this.carrelliService = carrelliService
  }

  ngOnInit(): void {
    this.quantita = this.prodQuant!.quantita
  }

  getUrlImmagineProdotto(): string {
    return this.prodottiService.getUrlImmagineProdotto(this.prodQuant!.prodotto.id)
  }

  decrementaQuantita() {
    if (this.quantita! > 0) {
      this.carrelliService.rimuoviDalCarrello(this.idCarrello!, this.prodQuant!.prodotto.id,1)
        .subscribe(() => {
          this.quantita!--
          if (this.quantita === 0)
            this.callbackRimuoviProdotto!()
        })
    }
  }

  incrementaQuantita() {
    this.carrelliService.aggiungiAlCarrello(this.idCarrello!, this.prodQuant!.prodotto.id,1)
      .subscribe(() => this.quantita!++)
  }
}
