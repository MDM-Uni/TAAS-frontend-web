import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Animale} from "../../../ospedale/models/animale";
import {
  GestoreEventiPersonalizzatiService
} from "../../services/gestore-eventi-personalizzati/gestore-eventi-personalizzati.service";
import {EventoPersonalizzato} from "../../models/evento-personalizzato";
import {HotToastService} from "@ngneat/hot-toast";
import {map} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {GestoreAnimaliService} from "../../../ospedale/services/gestore-animali/gestore-animali.service";

@Component({
  selector: 'app-box-aggiunta-evento-pers',
  templateUrl: './box-aggiunta-evento-pers.component.html',
  styleUrls: ['./box-aggiunta-evento-pers.component.css']
})
export class BoxAggiuntaEventoPersComponent implements OnInit {
  private file: File | null = null;
  postEventoForm : FormGroup;
  formResetConfig : any;
  @Output() eventoAggiuntoEmitter = new EventEmitter<EventoPersonalizzato>();
  animali: Animale[];

  constructor(
    private formBuilder: FormBuilder,
    public gestoreEventiPersonalizzati: GestoreEventiPersonalizzatiService,
    private gestoreAnimali: GestoreAnimaliService,
    private toast: HotToastService,
) { }

  ngOnInit(): void {
    this.animali = this.gestoreAnimali.getAnimaliUtente();
    this.formResetConfig = {
      data: new Date(Date.now()),
      testo: "",
      animale: [this.animali[0] ?? null, Validators.required],
      haImmagine: false,
      urlImmagine:  null,
    }
    this.postEventoForm = this.formBuilder.group(this.formResetConfig);
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
        this.postEventoForm.reset(this.formResetConfig);
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
