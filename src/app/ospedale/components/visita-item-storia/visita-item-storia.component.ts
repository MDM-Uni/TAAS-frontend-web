import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Visita} from "../../models/visita";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";
import {googleCalendarEventUrl} from "google-calendar-url"
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-visita-item-storia',
  templateUrl: './visita-item-storia.component.html',
  styleUrls: ['./visita-item-storia.component.css']
})
export class VisitaItemStoriaComponent implements OnInit {
  @Input() visita!: Visita;
  @Output() visitaEliminataEvent = new EventEmitter<Visita>();

  constructor(
    private gestoreEventiService: GestoreEventiService,
    public datePipe: DatePipe
) { }

  ngOnInit(): void {
  }

  deleteVisita(visita: Visita) {
    this.visitaEliminataEvent.emit(visita);
  }

  mostraAggiuntaVisitaCalendario(visita: Visita) {
    let startDateString = this.datePipe.transform(visita.data, "YYYYMMddTHHmmss", "+0000")+"Z";
    //console.log(startDateString);
    let endDate = new Date(visita.data.getTime() + (visita.durataInMinuti*60*1000) );
    let endDateString = this.datePipe.transform(endDate, "YYYYMMddTHHmmss", "+0000")+"Z";
    //console.log(endDateString);
    if (startDateString && endDateString) { //diverso da null o undefined
      const link = googleCalendarEventUrl({
        title: visita.tipoVisita.toLowerCase() + " per " + visita.animale.nome,
        start: startDateString,
        end: endDateString
      });

      window.open(link, "_blank");
    } else {
      console.log("Errore nella creazione del link per l'aggiunta della visita al calendario");
    }
  }

}
