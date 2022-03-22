import {Animale} from "./animale";

export interface Evento {
  id?: number;
  animale?: Animale;
  data?: Date;

  getData(): Date | undefined;
}
