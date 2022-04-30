import {Evento} from "../../generale/models/evento";
import {Animale} from "../../ospedale/models/animale";
import {SafeUrl} from "@angular/platform-browser";

export class EventoPersonalizzato implements Evento {
  animale?: Animale;
  data?: Date;
  id?: number;
  testo?: string;
  urlImmagine?: SafeUrl | null;
  haImmagine: boolean = false;


  getData() {
    return this.data;
  }


  constructor() {
  }
}
