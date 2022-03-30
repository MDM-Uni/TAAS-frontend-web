import { Component, OnInit } from '@angular/core';
import {Carrello} from "../../model/carrello";
import {Modal} from "bootstrap";
import {UtenteService} from "../../../service/utente.service";
import {environment} from "../../../../environments/environment";
import {Animale} from "../../../model/animale";
import {Indirizzo} from "../../model/indirizzo";
import {IndirizziService} from "../../service/indirizzi.service";
import {OrdiniService} from "../../service/ordini.service";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";

@Component({
  selector: 'app-ordine-modal',
  templateUrl: './ordine-modal.component.html',
  styleUrls: ['./ordine-modal.component.css']
})
export class OrdineModalComponent implements OnInit {
  private modal: Modal;
  carrello: Carrello;
  private utenteService: UtenteService;
  animali: Array<Animale>;
  fasiOrdine = ['Scegli animale', 'Scegli indirizzo di consegna', 'Pagamento','Conferma']
  faseCorrente = 0
  indirizzi: Array<Indirizzo>;
  private indirizziService: IndirizziService;
  private animale: Animale;
  private indirizzo: Indirizzo;
  private ordiniService: OrdiniService;
  payPalConfig: IPayPalConfig;

  constructor(utenteService: UtenteService, indirizziService: IndirizziService, ordiniService: OrdiniService) {
    this.utenteService = utenteService
    this.indirizziService = indirizziService
    this.ordiniService = ordiniService
  }

  ngOnInit(): void {
    this.modal = new Modal(document.getElementById("modalOrdine") as Element)
  }

  openModal(carrello: Carrello) {
    this.carrello = carrello
    this.utenteService.getAnimals(environment.mockUser).subscribe((animali) => this.animali = animali)
    this.indirizziService.getIndirizzi(environment.mockUser).subscribe((indirizzi) => this.indirizzi = indirizzi)
    this.initPayPal()
    this.modal.show()
  }

  closeModal() {
    this.modal.hide()
    this.faseCorrente = 0
  }

  selezionaFase(i: number) {
    this.faseCorrente = i
  }

  selezionaAnimale(animale: Animale) {
    this.animale = animale
    this.faseCorrente++
  }

  selezionaIndirizzo(indirizzo: Indirizzo) {
    this.indirizzo = indirizzo
    this.faseCorrente++
  }

  /*************************/

  initPayPal() {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: () => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.carrello.totale.toString(),
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.carrello.totale.toString()
                }
              }
            },
            items: this.carrello.prodotti.map<any>((prodQuant) => {
              return {
                name: prodQuant.prodotto.nome,
                quantity: prodQuant.quantita,
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: prodQuant.prodotto.prezzo.toString(),
                },
              }
            })
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onClientAuthorization: () => {
        this.ordiniService.creaOrdine(this.carrello.id, this.indirizzo.id, this.animale.id).subscribe({
          complete: () => this.faseCorrente++,
          error: (err) => console.log(err)
        })
      },
      onError: (err) => console.log('OnError', err),
    };
  }
}
