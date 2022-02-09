export class Animale{
  id: number;
  nome: string;
  dataDiNascita: Date;
  patologie: Array<string>;
  razza: string;
  peso: number;
  peloLungo: boolean;

  constructor(nome: string, dataDiNascita: Date, patologie: Array<string>, razza: string, peso: number, peloLungo: boolean) {
    this.nome = nome;
    this.dataDiNascita = dataDiNascita;
    this.patologie = patologie;
    this.razza = razza;
    this.peso = peso;
    this.peloLungo = peloLungo;
  }

}
