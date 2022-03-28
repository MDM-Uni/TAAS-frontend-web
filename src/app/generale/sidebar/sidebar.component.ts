import { Component, OnInit } from '@angular/core';
import {Dropdown} from "bootstrap";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private dropdownUtente: Dropdown;

  constructor() { }

  ngOnInit(): void {
    this.dropdownUtente = new Dropdown(document.getElementById("dropdown-utente") as Element)
  }

  toggleDropdownUtente() {
    this.dropdownUtente.toggle()
  }
}
