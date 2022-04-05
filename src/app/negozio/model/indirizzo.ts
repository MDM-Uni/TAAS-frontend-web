import {Pipe, PipeTransform} from "@angular/core";

export class Indirizzo {
  constructor(public id: number,
              public citta: string,
              public via: string,
              public numeroCivico: number,
              public interno: string | null){}
}

@Pipe({
  name: 'indirizzo'
})
export class IndirizzoPipe implements PipeTransform {
  transform(i: Indirizzo) {
    return `${i.citta}, ${i.via} ${i.numeroCivico}${i.interno !== null ? "/" + i.interno : ""}`
  }
}


