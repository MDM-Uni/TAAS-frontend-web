import {Evento} from "./evento";
import {Animale} from "./animale";

export class Prodotto {
  nome: string;
  prezzo: number;
  id: number;
  categoria: string;

  constructor(nome: string, prezzo: number, id: number, categoria: string) {
    this.nome = nome;
    this.prezzo = prezzo;
    this.id = id;
    this.categoria = categoria;
  }

}

export class Ordine implements Evento{
  id?: number;
  dataAcquisto?: Date;
  dataConsegna?: Date;
  prodotti: Map<Prodotto, number>
  animale?: Animale;
  data?: Date;

  constructor() {
    this.prodotti = new Map<Prodotto, number>();
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
    return this.dataAcquisto!;
  }

}
