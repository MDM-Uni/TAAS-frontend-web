import {Animale} from "./animale";

export interface Evento {
  id: number | undefined;
  animale: Animale | undefined;
  data: Date|undefined

  getData(): Date | undefined;
}
