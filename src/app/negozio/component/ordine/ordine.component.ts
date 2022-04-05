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
  animaleOrdineList: Array<AnimaleOrdine>
  animaliUtente: Array<Animale>
  @ViewChild(AnnullaOrdineModalComponent) annullaOrdineModal: AnnullaOrdineModalComponent

  constructor(private ordiniService: OrdiniService,
              private prodottiService: ProdottiService,
              private utenteService: UtenteService,
              private toast: HotToastService) {
    this.ordiniService.getOrdini(environment.mockUser).subscribe((animaleOrdineList) => {
        utenteService.getAnimals(environment.mockUser).subscribe((animali) => {
          this.animaleOrdineList = animaleOrdineList
          for (let animOrd of animaleOrdineList) {
            let index = animali.findIndex((a) => a.id == animOrd.animale.id)
            animOrd.animale.nome = animali[index].nome
          }
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
          let index = this.animaleOrdineList.indexOf(animaleOrdine)
          this.animaleOrdineList.splice(index, 1)
        })
    }
  }
}
