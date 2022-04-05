import {ProdottoQuantita} from "./carrello";
import {Indirizzo} from "./indirizzo";
import {Animale} from "../../utente/model/animale";

export interface AnimaleOrdine {
  animale: Animale,
  ordine: Ordine
}

export interface Ordine {
  id: number
  dataAcquisto: Date
  dataConsegna: Date | null
  prodotti: Array<ProdottoQuantita>
  indirizzoConsegna: Indirizzo
  numeroArticoli: number
  totale: number
}
