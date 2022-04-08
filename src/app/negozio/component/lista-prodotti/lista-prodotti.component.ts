import {Component, OnInit, ViewChild} from '@angular/core';
import {ProdottiService} from "../../service/prodotti.service";
import {ProdottoModalComponent} from "../prodotto-modal/prodotto-modal.component";
import {Prodotto} from "../../model/prodotto";
import {diceCoefficient} from 'dice-coefficient';

@Component({
  selector: 'app-lista-prodotti',
  templateUrl: './lista-prodotti.component.html',
  styleUrls: ['./lista-prodotti.component.css']
})
export class ListaProdottiComponent implements OnInit {
  LIST_MODE = false
  @ViewChild(ProdottoModalComponent) modalComponent: ProdottoModalComponent | undefined


  prodottiAll: Array<Prodotto>
  prodotti: Array<Prodotto>
  categoriaSelect: string | null = null;
  categorie: Set<string | null>;
  cerca: string;

  constructor(private prodottiService: ProdottiService) {
    this.prodottiService = prodottiService
    prodottiService.getProdotti().subscribe((prodotti) => {
      this.prodottiAll = prodotti
      this.prodotti = prodotti
      let categorie: Array<string | null> = prodotti.map((p) => p.categoria)
      categorie.splice(0,0,null)
      this.categorie = new Set(categorie)
    })
  }

  ngOnInit(): void {

  }

  getUrlImmagineProdotto(id: number): string {
    return this.prodottiService.getUrlImmagineProdotto(id)
  }

  openModal(prodotto: Prodotto) {
    this.modalComponent?.openModal(prodotto)
  }

  filtra() {
    if (this.categoriaSelect === null)
      this.prodotti = this.prodottiAll
    else {
      this.prodotti = this.prodottiAll.filter((p) => p.categoria === this.categoriaSelect)
    }

    if (this.cerca) {
      let sim = new Map(this.prodotti.map((p) => [
        p,
        p.nome.includes(this.cerca) || this.cerca.trim() === '' ? 1 : diceCoefficient(this.cerca, p.nome)
      ]))
      this.prodotti = this.prodotti.filter((p) => sim.get(p)! >= 0.4)
      this.prodotti.sort((a,b) => sim.get(a)! - sim.get(b)!)
    }
  }
}
