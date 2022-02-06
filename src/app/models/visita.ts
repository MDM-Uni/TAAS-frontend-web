import {Evento} from "./evento";

export class Visita implements Evento{
  tipoVisita: string;
  data: Date;
  durataInMinuti: number;
  note: string;
  id: number;

  getData(): Date {
    return this.data;
  }

}
