export class Animale{
  id: number;
  private _nome: string;
  private _dataDiNascita: string;
  private _patologie: Array<string>;
  private _razza: string;
  private _peso: number;
  private _peloLungo: boolean;


  constructor(nome: string, razza: string) {
    this._nome = nome;
    this._razza = razza;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get dataDiNascita(): string {
    return this._dataDiNascita;
  }

  set dataDiNascita(value: string) {
    this._dataDiNascita = value;
  }

  get patologie(): Array<string> {
    return this._patologie;
  }

  set patologie(value: Array<string>) {
    this._patologie = value;
  }

  get razza(): string {
    return this._razza;
  }

  set razza(value: string) {
    this._razza = value;
  }

  get peso(): number {
    return this._peso;
  }

  set peso(value: number) {
    this._peso = value;
  }

  get peloLungo(): boolean {
    return this._peloLungo;
  }

  set peloLungo(value: boolean) {
    this._peloLungo = value;
  }
}
