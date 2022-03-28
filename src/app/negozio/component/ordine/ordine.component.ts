import { Component, OnInit } from '@angular/core';
import {OrdiniService} from "../../service/ordini.service";
import {ProdottiService} from "../../service/prodotti.service";
import {Ordine} from "../../model/ordine";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ordine',
  templateUrl: './ordine.component.html',
  styleUrls: ['./ordine.component.css']
})
export class OrdineComponent implements OnInit {
  private ordiniService: OrdiniService;
  private prodottiService: ProdottiService;
  ordini: Array<Ordine>

  constructor(ordiniService: OrdiniService, prodottiService: ProdottiService) {
    this.ordiniService = ordiniService
    this.prodottiService = prodottiService

    this.ordiniService.getOrdini(environment.mockUser).subscribe((ordini) => this.ordini = ordini)
  }

  ngOnInit(): void {
  }

  getUrlImmagineProdotto(id: number) {
    return this.prodottiService.getUrlImmagineProdotto(id)
  }

  annullaOrdine(ordine: Ordine) {
    this.ordiniService.annullaOrdine(ordine.id).subscribe(() => {
      let index = this.ordini.indexOf(ordine)
      this.ordini.splice(index,1)
    })
  }
}
