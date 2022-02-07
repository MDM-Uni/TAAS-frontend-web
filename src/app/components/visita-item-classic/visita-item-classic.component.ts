import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Visita} from "../../models/visita";

@Component({
  selector: 'app-visita-item-classic',
  templateUrl: './visita-item-classic.component.html',
  styleUrls: ['./visita-item-classic.component.css']
})
export class VisitaItemClassicComponent implements OnInit, OnDestroy {
  @Input() visita: Visita;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
