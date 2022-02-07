import {Component, Input, OnInit} from '@angular/core';
import {Visita} from "../../models/visita";

@Component({
  selector: 'app-visita-item-storia',
  templateUrl: './visita-item-storia.component.html',
  styleUrls: ['./visita-item-storia.component.css']
})
export class VisitaItemStoriaComponent implements OnInit {
  @Input() visita!: Visita;

  constructor() { }

  ngOnInit(): void {
  }

}
