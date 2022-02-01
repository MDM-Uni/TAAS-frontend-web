import { Animale } from "./animale";

export interface Utente extends Array<Animale>{
  id: number;
  nome: string;
  email: string;
  animali: Array<Animale>;
}
