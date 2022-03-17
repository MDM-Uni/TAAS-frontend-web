import {Evento} from "../../ospedale/models/evento";
import {Animale} from "../../ospedale/models/animale";

export class EventoPersonalizzato implements Evento {
  animale: Animale | undefined;
  data: Date | undefined;
  id: number | undefined;
  testo: string | undefined;

  getData() {
    return this.data;
  }


  constructor() {
  }
}
