import { Component, OnInit } from '@angular/core';
import {Carrello} from "../../model/carrello";
import {Modal} from "bootstrap";

@Component({
  selector: 'app-ordine-modal',
  templateUrl: './ordine-modal.component.html',
  styleUrls: ['./ordine-modal.component.css']
})
export class OrdineModalComponent implements OnInit {
  private modal: Modal;

  constructor() { }

  ngOnInit(): void {
    this.modal = new Modal(document.getElementById("modalOrdine") as Element)
  }

  openModal(carrello: Carrello) {
    this.modal.show()
  }

  closeModal() {
    this.modal.hide()
  }
}
