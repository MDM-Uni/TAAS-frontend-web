import { Animale } from "./animale";

export class Utente {
  private _id: number;
  _nome: string;
  private _email: string;
  private _animali: Animale[];


  constructor(id: number, nome: string, email: string, animali: Animale[]) {
    this._id = id;
    this._nome = nome;
    this._email = email;
    this._animali = animali;
  }

  get id(): number {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get email(): string {
    return this._email;
  }

  get animali(): Animale[] {
    return this._animali;
  }

  set animali(value: Animale[]) {
    this._animali = value;
  }

}

