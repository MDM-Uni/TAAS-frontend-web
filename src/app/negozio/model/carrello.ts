import {Prodotto} from "./prodotto";

export interface Carrello {
  id: number
  prodotti: Array<Prodotto>
  numeroArticoli: number
  totale: number
}
