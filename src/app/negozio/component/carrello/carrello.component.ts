import { Component, OnInit } from '@angular/core';
import {Carrello, ProdottoQuantita} from "../../model/carrello";
import {CarrelliService} from "../../service/carrelli.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  carrello: Carrello | undefined

  constructor(carrelliService: CarrelliService) {
    carrelliService.getCarrello(environment.mockUser).subscribe((carrello) => this.carrello = carrello)
  }

  ngOnInit(): void {
  }

  rimuoviProdotto(prodQuant: ProdottoQuantita) {
    return () => {
      let index = this.carrello!.prodotti.indexOf(prodQuant)
      this.carrello?.prodotti.splice(index, 1)
    }
  }
}
