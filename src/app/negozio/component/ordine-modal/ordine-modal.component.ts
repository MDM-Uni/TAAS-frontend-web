import {Component, OnInit, ViewChild} from '@angular/core';
import {Carrello} from "../../model/carrello";
import {Modal} from "bootstrap";
import {UtenteService} from "../../../utente/service/utente.service";
import {environment} from "../../../../environments/environment";
import {Animale} from "../../../utente/model/animale";
import {Indirizzo} from "../../model/indirizzo";
import {IndirizziService} from "../../service/indirizzi.service";
import {OrdiniService} from "../../service/ordini.service";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {ProdottiService} from "../../service/prodotti.service";
import {HotToastService} from "@ngneat/hot-toast";
import {IndirizzoCollapseComponent} from "../indirizzo-collapse/indirizzo-collapse.component";

@Component({
  selector: 'app-ordine-modal',
  templateUrl: './ordine-modal.component.html',
  styleUrls: ['./ordine-modal.component.css']
})
export class OrdineModalComponent implements OnInit {
  private modal: Modal;
  carrello: Carrello;
  animali: Array<Animale>;
  fasiOrdine = ['Scegli animale', 'Scegli indirizzo di consegna', 'Riepilogo e pagamento','Conferma']
  faseCorrente = 0
  indirizzi: Array<Indirizzo>;
  animale: Animale;
  indirizzo: Indirizzo;
  payPalConfig: IPayPalConfig;
  @ViewChild(IndirizzoCollapseComponent) indirizzoCollapse: IndirizzoCollapseComponent;
  showEliminaButton: boolean;

  constructor(private utenteService: UtenteService,
              private indirizziService: IndirizziService,
              private ordiniService: OrdiniService,
              private prodottiService: ProdottiService,
              private toast: HotToastService) {
  }

  ngOnInit(): void {
    this.modal = new Modal(document.getElementById("modalOrdine") as Element)
  }

  openModal(carrello: Carrello) {
    this.carrello = carrello
    this.faseCorrente = 0
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

  aggiungiIndirizzo() {
    return (citta: string, via: string, numeroCivico: number, interno: string | null) => {
      this.indirizziService.aggiungiIndirizzo(environment.mockUser, citta, via, numeroCivico, interno)
        .pipe(this.toast.observe({
          success: 'Indirizzo aggiunto con successo',
          error: "C'è stato un problema... l'indirizzo non è stato aggiunti",
          loading: "Attendi"
        }))
        .subscribe((indirizzo) => this.indirizzi.push(indirizzo))
    }
  }

  eliminaIndirizzo(indir: Indirizzo) {
    this.indirizziService.rimuoviIndirizzo(environment.mockUser,indir.id)
      .pipe(this.toast.observe({
        success: 'Indirizzo rimosso con successo',
        error: "C'è stato un problema... l'indirizzo non è stato rimosso",
        loading: "Attendi"
      }))
      .subscribe((indirizzo) => {
        let index = this.indirizzi.indexOf(indirizzo)
        this.indirizzi.splice(index,1)
        this.toggleShowElimina()
      })
  }

  getUrlImmagineProdotto(id: number) {
    return this.prodottiService.getUrlImmagineProdotto(id)
  }

  toggleCollapse() {
    this.indirizzoCollapse.toggleCollapse()
  }

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
              value: this.carrello.totale.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.carrello.totale.toFixed(2)
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
                  value: prodQuant.prodotto.prezzo.toFixed(2),
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
        this.ordiniService.creaOrdine(this.carrello.id, this.indirizzo.id, this.animale.id)
          .pipe(this.toast.observe({
            loading: "Attendi",
            success: "Ordine effettuato con successo",
            error: "C\'è stato un problema... non è stato possibile effettuare l'ordine"
          }))
          .subscribe(() => this.faseCorrente++)
      },
      onError: (err) => this.toast.error('Il servizio di pagamento ha riscontrato un problema... riprovare'),
    };
  }

  toggleShowElimina() {
    this.showEliminaButton = !this.showEliminaButton;
  }
}
