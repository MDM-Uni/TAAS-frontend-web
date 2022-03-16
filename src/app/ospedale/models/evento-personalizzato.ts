import {Evento} from "./evento";
import {Animale} from "./animale";

export class EventoPersonalizzato implements Evento {
  animale: Animale | undefined;
  data: Date | undefined;
  id: number | undefined;
  testo: string | undefined;
  immagine: any;

  getData() {
    return this.data;
  }


  constructor() {
  }
}
