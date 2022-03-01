import {Evento} from "./evento";
import {Animale} from "./animale";
import {formatDate} from "@angular/common";

export class Visita implements Evento{
  tipoVisita: string;
  data: Date;
  durataInMinuti: number;
  note: string;
  id: number;
  animale: Animale;
  dataFormattata: string;

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
    this.dataFormattata = formatDate(data, 'dd-MM-yyyy HH:mm:ss', 'en');
  }
}
