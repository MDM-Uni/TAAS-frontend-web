import {Evento} from "./evento";

export class Visita implements Evento{
  tipoVisita: string;
  data: Date;
  durataInMinuti: number;
  note: string;
  id: number;
  idAnimale: number;

  getData(): Date {
    return this.data;
  }

  constructor(tipoVisita: string, data: Date, durataInMinuti: number, note: string, id: number, idAnimale: number) {
    this.tipoVisita = tipoVisita;
    this.data = data;
    this.durataInMinuti = durataInMinuti;
    this.note = note;
    this.id = id;
    this.idAnimale = idAnimale;
  }
}
