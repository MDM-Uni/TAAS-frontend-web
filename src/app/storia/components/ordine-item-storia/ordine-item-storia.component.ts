import {Component, Input, OnInit} from '@angular/core';
import {AnimaleOrdine} from "../../../negozio/model/ordine";
import {ProdottiService} from "../../../negozio/service/prodotti.service";
import {OrdinePerEventi} from "../../models/ordine-per-eventi";

@Component({
  selector: 'app-ordine-item-storia',
  templateUrl: './ordine-item-storia.component.html',
  styleUrls: ['./ordine-item-storia.component.css']
})
export class OrdineItemStoriaComponent implements OnInit {
   @Input() ordine: OrdinePerEventi

  constructor(private prodottiService: ProdottiService) { }

  ngOnInit(): void {
  }

  getUrlImmagineProdotto(id: number): string {
     return this.prodottiService.getUrlImmagineProdotto(id)
  }

}
