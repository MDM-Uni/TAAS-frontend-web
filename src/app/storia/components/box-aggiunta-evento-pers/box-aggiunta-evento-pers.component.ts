import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Animale} from "../../../ospedale/models/animale";
import {
  GestoreEventiPersonalizzatiService
} from "../../services/gestore-eventi-personalizzati/gestore-eventi-personalizzati.service";
import {EventoPersonalizzato} from "../../models/evento-personalizzato";
import {HotToastService} from "@ngneat/hot-toast";
import {map} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-box-aggiunta-evento-pers',
  templateUrl: './box-aggiunta-evento-pers.component.html',
  styleUrls: ['./box-aggiunta-evento-pers.component.css']
})
export class BoxAggiuntaEventoPersComponent implements OnInit {
  private file: File | null = null;
  postEventoForm = this.formBuilder.group({
    data: new Date(Date.now()),
    testo: "",
    animale: new Animale(2), //todo da metterne uno vero
    haImmagine: false,
    urlImmagine:  null,
  })
  @Output() eventoAggiuntoEmitter = new EventEmitter<EventoPersonalizzato>();

  constructor(
    private formBuilder: FormBuilder,
    public gestoreEventiPersonalizzati: GestoreEventiPersonalizzatiService,
    private toast: HotToastService,
) { }

  ngOnInit(): void {
  }

  handleAggiuntaEventoPersonalizzato() {
    this.postEventoForm.patchValue({"data": new Date(Date.now())});
    let evento = this.postEventoForm.value;
    console.log("form value post evento aggiunto")
    console.table(evento);
    let risultato = this.gestoreEventiPersonalizzati.postEventoPersonalizzato(this.postEventoForm.value, this.file ?? undefined);
    risultato = risultato.pipe(
      this.toast.observe({
         success: 'Evento pubblicato con successo!',
         error: 'Qualcosa è andato storto!'
      })
    );
    risultato.pipe(
      map((id) => evento.id=id),
    ).subscribe({
      next: (data) => {
        if (this.postEventoForm.get('haImmagine')?.value) {
          this.gestoreEventiPersonalizzati.setImmagineEvPers(evento);
        }
        this.eventoAggiuntoEmitter.emit(evento);
        this.postEventoForm.reset();
      }
    });
  }

  onImmagineAggiunta(event: any) {
    console.log("event.target.files[0]")
    console.log(event.target.files[0]);
    this.postEventoForm.patchValue({
      'haImmagine': true,
    });
    this.file = event.target.files[0];
  }
}
