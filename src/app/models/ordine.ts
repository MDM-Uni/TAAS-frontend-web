import {Evento} from "./evento";

export class Prodotto {
  nome: string;
  prezzo: number;
  id: number;
  categoria: string;

}

export class Ordine implements Evento{
  id: number;
  dataAcquisto: Date;
  dataConsegna: Date;
  prodotti: Map<Prodotto, number>

  constructor() {
    this.prodotti = new Map<Prodotto, number>();
  }

  constructor(id: number, dataAcquisto: Date, dataConsegna: Date, prodotti: Map<Prodotto, number>) {
    this.id = id;
    this.dataAcquisto = dataAcquisto;
    this.dataConsegna = dataConsegna;
    this.prodotti = prodotti;
  }

  getNumeroArticoli(): number {
    let numeroArticoli = 0;
    for (let numero of this.prodotti.values()) {
      numeroArticoli += numero;
    }
    return numeroArticoli;
  }

  getTotale(): number {
    let totale = 0;
    for (let [prodotto, numero] of this.prodotti) {
      totale += prodotto.prezzo * numero;
    }
    return totale;
  }

  getData(): Date {
    return this.dataAcquisto;
  }
}
