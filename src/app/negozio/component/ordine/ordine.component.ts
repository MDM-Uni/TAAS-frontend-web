import { Component, OnInit } from '@angular/core';
import {OrdiniService} from "../../service/ordini.service";
import {ProdottiService} from "../../service/prodotti.service";
import {AnimaleOrdine} from "../../model/ordine";
import {environment} from "../../../../environments/environment";
import {Animale} from "../../../model/animale";
import {UtenteService} from "../../../service/utente.service";

@Component({
  selector: 'app-ordine',
  templateUrl: './ordine.component.html',
  styleUrls: ['./ordine.component.css']
})
export class OrdineComponent implements OnInit {
  private ordiniService: OrdiniService;
  private prodottiService: ProdottiService;
  animaleOrdineList: Array<AnimaleOrdine>
  animaliUtente: Array<Animale>

  constructor(ordiniService: OrdiniService, prodottiService: ProdottiService, utenteService: UtenteService) {
    this.ordiniService = ordiniService
    this.prodottiService = prodottiService

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

  annullaOrdine(animaleOrdine: AnimaleOrdine) {
    this.ordiniService.annullaOrdine(animaleOrdine.ordine.id).subscribe(() => {
      let index = this.animaleOrdineList.indexOf(animaleOrdine)
      this.animaleOrdineList.splice(index,1)
    })
  }
}
