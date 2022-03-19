import {Prodotto} from "./prodotto";

export interface ProdottoQuantita {
  prodotto: Prodotto,
  quantita: number
}

export interface Carrello {
  id: number
  prodotti: Array<ProdottoQuantita>
  numeroArticoli: number
  totale: number
}
