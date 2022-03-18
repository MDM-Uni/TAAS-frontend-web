import {Animale} from "./animale";

export interface Evento {
  id: number;
  animale: Animale;

  getData(): Date;
}
