import {Evento} from "../../generale/models/evento";
import {Animale} from "../../ospedale/models/animale";
import {ProdottoQuantita} from "../../negozio/model/carrello";
import {Indirizzo} from "../../negozio/model/indirizzo";

export class OrdinePerEventi implements Evento {
  animale: Animale;
  id: number;
  dataAcquisto: Date;
  dataConsegna: Date | null;
  prodotti: Array<ProdottoQuantita>;
  indirizzoConsegna: Indirizzo;
  numeroArticoli: number;
  totale: number;

  constructor(id: number, animale: Animale, dataAcquisto: Date, dataConsegna: Date | null, prodotti: Array<ProdottoQuantita>, indirizzoConsegna: Indirizzo, numeroArticoli: number, totale: number) {
    this.animale = animale;
    this.id = id;
    this.dataAcquisto = dataAcquisto;
    this.dataConsegna = dataConsegna;
    this.prodotti = prodotti;
    this.indirizzoConsegna = indirizzoConsegna;
    this.numeroArticoli = numeroArticoli;
    this.totale = totale;
  }

  getData(): Date | undefined {
    return this.dataAcquisto;
  }


}
