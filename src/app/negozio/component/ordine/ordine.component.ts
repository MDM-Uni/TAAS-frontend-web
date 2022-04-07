import {Component, OnInit, ViewChild} from '@angular/core';
import {OrdiniService} from "../../service/ordini.service";
import {ProdottiService} from "../../service/prodotti.service";
import {AnimaleOrdine} from "../../model/ordine";
import {environment} from "../../../../environments/environment";
import {Animale} from "../../../utente/model/animale";
import {UtenteService} from "../../../utente/service/utente.service";
import {HotToastService} from "@ngneat/hot-toast";
import {AnnullaOrdineModalComponent} from "../annulla-ordine-modal/annulla-ordine-modal.component";

@Component({
  selector: 'app-ordine',
  templateUrl: './ordine.component.html',
  styleUrls: ['./ordine.component.css']
})
export class OrdineComponent implements OnInit {
  @ViewChild(AnnullaOrdineModalComponent) annullaOrdineModal: AnnullaOrdineModalComponent

  animaliUtente: Array<Animale>
  animaleOrdineAll: Array<AnimaleOrdine>
  animaleOrdineList: Array<AnimaleOrdine>

  tempi = [3,6,12,24,36,Number.POSITIVE_INFINITY];
  tempoSelect = this.tempi[0];
  tempiString = ['Ultimi 3 mesi','Ultimi 6 mesi','Ultimo anno','Ultimi 2 anni','Ultimi 3 anni','Tutti gli ordini'];
  mostraNonConsegnati = true;
  mostraConsegnati = true;

  constructor(private ordiniService: OrdiniService,
              private prodottiService: ProdottiService,
              private utenteService: UtenteService,
              private toast: HotToastService) {
    this.ordiniService.getOrdini(environment.mockUser).subscribe((animaleOrdineList) => {
        utenteService.getAnimals(environment.mockUser).subscribe((animali) => {
          this.animaleOrdineAll = animaleOrdineList
          for (let animOrd of animaleOrdineList) {
            let index = animali.findIndex((a) => a.id == animOrd.animale.id)
            animOrd.animale.nome = animali[index].nome
          }
          this.filtra()
        })
      })
  }

  ngOnInit(): void {
  }

  getUrlImmagineProdotto(id: number) {
    return this.prodottiService.getUrlImmagineProdotto(id)
  }

  openModal(animaleOrdine: AnimaleOrdine) {
    this.annullaOrdineModal.openModal(this.annullaOrdine(animaleOrdine))
  }

  private annullaOrdine(animaleOrdine: AnimaleOrdine) {
    return () => {
      this.ordiniService.annullaOrdine(animaleOrdine.ordine.id)
        .pipe(this.toast.observe({
          loading: "Attendi",
          success: "Ordine annullato con successo",
          error: "C\'è stato un problema... l\'ordine non è stato annullato"
        }))
        .subscribe(() => {
          let index = this.animaleOrdineAll.indexOf(animaleOrdine)
          this.animaleOrdineAll.splice(index, 1)
          this.filtra()
        })
    }
  }

  mesiTraDate(d1: Date, d2: Date) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months += d2.getMonth() - d1.getMonth();
    return months <= 0 ? 0 : months;
  }

  filtra() {
    this.animaleOrdineList = this.animaleOrdineAll.filter((animOrd) =>
      this.mesiTraDate(new Date(animOrd.ordine.dataAcquisto),new Date()) <= this.tempoSelect
      && (this.mostraConsegnati && animOrd.ordine.dataConsegna !== null
        || this.mostraNonConsegnati && animOrd.ordine.dataConsegna === null)
    )
  }
}
