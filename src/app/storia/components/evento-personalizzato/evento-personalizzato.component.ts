import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventoPersonalizzato} from "../../models/evento-personalizzato";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";
import {DatePipe} from "@angular/common";
import {
  GestoreEventiPersonalizzatiService
} from "../../services/gestore-eventi-personalizzati/gestore-eventi-personalizzati.service";

@Component({
  selector: 'app-evento-personalizzato',
  templateUrl: './evento-personalizzato.component.html',
  styleUrls: ['./evento-personalizzato.component.css']
})
export class EventoPersonalizzatoComponent implements OnInit {
  @Input() eventoPersonalizzato!: EventoPersonalizzato;
  @Output() eventoPersonalizzatoEliminatoEvent = new EventEmitter<EventoPersonalizzato>();

  constructor(
    public gestoreEventiService: GestoreEventiService,
    public datePipe: DatePipe,
    public gestoreEventiPersService: GestoreEventiPersonalizzatiService
  ) { }

  ngOnInit(): void {
  }

  handleEliminaEventoPersonalizzato() {
    this.eventoPersonalizzatoEliminatoEvent.emit(this.eventoPersonalizzato);
  }
}
