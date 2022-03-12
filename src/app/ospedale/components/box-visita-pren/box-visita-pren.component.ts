import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";
import {map, Observable, tap} from "rxjs";
import {Animale} from "../../models/animale";
import {Visita} from "../../models/visita";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-box-visita-pren',
  templateUrl: './box-visita-pren.component.html',
  styleUrls: ['./box-visita-pren.component.css']
})
export class BoxVisitaPrenComponent implements OnInit, OnDestroy {
  animali!: Observable<Animale[]>;
  @Output('eventoAggiunto') eventoAggiuntoEmitter = new EventEmitter<Visita>();

  postVisitaForm = this.formBuilder.group({
    data:"",
    durataInMinuti:30,
    note:"",
    tipoVisita:"VACCINO",
    idAnimale:1
  });


  constructor(
    private formBuilder: FormBuilder,
    private animaliService: GestoreAnimaliService,
    private visiteService: GestoreEventiService,
    private toast: HotToastService
) {}

  ngOnInit(): void {
    this.animali = this.animaliService.getAnimali();
  }

  //invia richiesta di aggiunta visita
  onSubmit() {
    let visita = this.postVisitaForm.value;
    console.log("Visita da inviare", visita);
    let risultato = this.visiteService.postVisita(this.postVisitaForm.value);
    risultato = risultato.pipe(
      this.toast.observe({
         loading: 'Sto verificando la disponibilità...',
         success: 'Visita registrata con successo!',
         error: 'Qualcosa è andato storto!'
      })
    );
    risultato.pipe(
      tap((id) => console.log("Visita aggiunta con id: ", id))
    ).subscribe();
    this.eventoAggiuntoEmitter.emit(visita);
  }

  ngOnDestroy(): void {
  }
}
