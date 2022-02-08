import {Evento} from "./evento";
import {Animale} from "./animale";

export class Visita implements Evento{
  tipoVisita: string;
  data: Date;
  durataInMinuti: number;
  note: string;
  id: number;
  animale: Animale;

  getData(): Date {
    return this.data;
  }

  constructor(tipoVisita: string, data: Date, durataInMinuti: number, note: string, id: number, animale: Animale) {
    this.tipoVisita = tipoVisita;
    this.data = data;
    this.durataInMinuti = durataInMinuti;
    this.note = note;
    this.id = id;
    this.animale = animale;
  }
}
