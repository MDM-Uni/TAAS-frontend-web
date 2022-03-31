import {Component, Input, OnInit} from '@angular/core';
import {ProdottoQuantita} from "../../model/carrello";
import {ProdottiService} from "../../service/prodotti.service";
import {CarrelliService} from "../../service/carrelli.service";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-carrello-item',
  templateUrl: './carrello-item.component.html',
  styleUrls: ['./carrello-item.component.css']
})
export class CarrelloItemComponent implements OnInit {
  @Input() idCarrello: number | undefined
  @Input() prodQuant: ProdottoQuantita | undefined;
  @Input() callbackModificaQuantita: ((_: number) => void) | undefined
  quantita: number | undefined = 0

  constructor(private prodottiService: ProdottiService,
              private carrelliService: CarrelliService,
              private toast: HotToastService) {
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
        .pipe(this.toast.observe({
          loading: "Attendi",
          success: "Articolo rimosso dal carrello",
          error: "C\'è stato un problema... l\'articolo non è stato rimosso dal carrello"
        }))
        .subscribe(() => {
          this.quantita!--
          this.callbackModificaQuantita!(-1)
        })
    }
  }

  incrementaQuantita() {
    this.carrelliService.aggiungiAlCarrello(this.idCarrello!, this.prodQuant!.prodotto.id,1)
      .pipe(this.toast.observe({
        loading: "Attendi",
        success: 'Articolo aggiunto al carrello',
        error: 'C\'è stato un problema... l\'articolo non è stato aggiunto al carrello'
      }))
      .subscribe(() => {
        this.quantita!++
        this.callbackModificaQuantita!(1)
      })
  }
}
