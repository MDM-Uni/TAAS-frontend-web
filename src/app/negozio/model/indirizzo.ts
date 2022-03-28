import {Pipe, PipeTransform} from "@angular/core";

export class Indirizzo {
  id: number
  citta: string
  via: string
  numeroCivico: number
  interno: string | null
}

@Pipe({
  name: 'indirizzo'
})
export class IndirizzoPipe implements PipeTransform {
  transform(i: Indirizzo) {
    return `${i.citta}, ${i.via} ${i.numeroCivico}${i.interno !== null ? "/" + i.interno : ""}`
  }
}


