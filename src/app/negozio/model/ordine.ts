import {ProdottoQuantita} from "./carrello";
import {Indirizzo} from "./indirizzo";

export interface Ordine {
  id: number
  dataAcquisto: Date
  dataConsegna: Date | null
  prodotti: Array<ProdottoQuantita>
  indirizzoConsegna: Indirizzo
  numeroArticoli: number
  totale: number
}
