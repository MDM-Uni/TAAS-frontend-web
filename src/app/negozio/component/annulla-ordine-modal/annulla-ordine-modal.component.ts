import { Component, OnInit } from '@angular/core';
import {Modal} from "bootstrap";

@Component({
  selector: 'app-annulla-ordine-modal',
  templateUrl: './annulla-ordine-modal.component.html',
  styleUrls: ['./annulla-ordine-modal.component.css']
})
export class AnnullaOrdineModalComponent implements OnInit {
  private modal: Modal;
  private callbackAnnullaOrdine: () => void;

  // form non utilizzato nella pratica: solo per rendere completa l'interfaccia
  opzioni = ['Scegli un\'opzione','Ho effettuato l\'ordine per sbaglio', 'Non ho fatto io l\'ordine', 'Ho cambiato idea'];
  valoreMotivoSelect: number;
  valoreMotivoText: string;

  constructor() { }

  ngOnInit(): void {
    this.modal = new Modal(document.getElementById("modalAnnullaOrdine") as Element)
  }

  openModal(callbackAnnullaOrdine: () => void) {
    this.callbackAnnullaOrdine = callbackAnnullaOrdine
    this.valoreMotivoSelect = 0
    this.modal.show()
  }

  closeModal() {
    this.modal.hide()
  }

  annullaOrdine() {
    this.callbackAnnullaOrdine()
    this.modal.hide()
  }
}
