import { Component, OnInit } from '@angular/core';
import {Carrello} from "../../model/carrello";

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  carrello: Carrello | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
