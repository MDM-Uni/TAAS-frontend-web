import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Visita} from "../../models/visita";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";

@Component({
  selector: 'app-visita-item-storia',
  templateUrl: './visita-item-storia.component.html',
  styleUrls: ['./visita-item-storia.component.css']
})
export class VisitaItemStoriaComponent implements OnInit {
  @Input() visita!: Visita;
  @Output() visitaEliminataEvent = new EventEmitter<Visita>();

  constructor(
    private gestoreEventiService: GestoreEventiService
) { }

  ngOnInit(): void {
  }

  deleteVisita(visita: Visita) {
    this.visitaEliminataEvent.emit(visita);
  }
}
