import {Evento} from "./evento";

export class Visita implements Evento{
  tipoVisita: string;
  data: Date;
  durataInMinuti: number;
  note: string;
  id: number;

  getData(): Date {
    return this.data;
  }

  constructor(tipoVisita: string, data: Date, durataInMinuti: number, note: string, id: number) {
    this.tipoVisita = tipoVisita;
    this.data = data;
    this.durataInMinuti = durataInMinuti;
    this.note = note;
    this.id = id;
  }
}
