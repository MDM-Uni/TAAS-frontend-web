import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Evento} from "../../models/evento";
import {EventoPersonalizzato} from "../../models/evento-personalizzato";
import {Visita} from "../../models/visita";

@Component({
  selector: 'app-card-evento',
  templateUrl: './card-evento.component.html',
  styleUrls: ['./card-evento.component.css']
})
export class CardEventoComponent implements OnInit {
  @Input() evento!: Evento;
  @Output() visitaEliminataEmitter = new EventEmitter<Visita>();
  constructor() { }

  ngOnInit(): void {
  }

  isEventoPersonalizzato(val: Evento): boolean {return val instanceof EventoPersonalizzato}
  isVisita(val: Evento):boolean {return val instanceof Visita}

  castToEventoPersonalizzato(evento: Evento): EventoPersonalizzato {
    return evento as EventoPersonalizzato;
  }

  castToVisita(evento: Evento): Visita {
    return evento as Visita;
  }

  handleVisitaEliminata(visita: Visita) {
    this.visitaEliminataEmitter.emit(visita);
  }
}
