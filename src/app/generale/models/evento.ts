import {Animale} from "../../ospedale/models/animale";

export interface Evento {
  id?: number;
  animale?: Animale;

  getData(): Date | undefined;
}
