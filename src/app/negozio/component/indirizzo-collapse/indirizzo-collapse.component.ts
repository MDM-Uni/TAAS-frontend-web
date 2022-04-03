import {Component, Input, OnInit} from '@angular/core';
import {Collapse} from "bootstrap";

@Component({
  selector: 'app-indirizzo-collapse',
  templateUrl: './indirizzo-collapse.component.html',
  styleUrls: ['./indirizzo-collapse.component.css']
})
export class IndirizzoCollapseComponent implements OnInit {
  private collapse: Collapse | undefined;
  private elem: HTMLElement | null;
  citta: string;
  via: string;
  numeroCivico: number | undefined;
  interno: string | null;
  @Input() callbackAggiungiIndirizzo: (citta: string, via: string, numeroCivico: number, interno: string | null) => void

  constructor() { }

  ngOnInit(): void {
    this.elem = document.getElementById("collapseNuovoIndirizzo")
    this.elem!.classList.add('collapse', 'collapsing')
  }

  toggleCollapse() {
    if (this.collapse === undefined)
      this.collapse = new Collapse(this.elem as Element)
    else
      this.collapse.toggle()
  }

  aggiungiIndirizzo() {
    this.callbackAggiungiIndirizzo(this.citta, this.via, this.numeroCivico!, this.interno)
    this.collapse?.toggle()
  }

  disabilita() {
    return !this.citta || !this.via || !this.numeroCivico
  }
}
