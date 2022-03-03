import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";
import {Observable} from "rxjs";
import {Animale} from "../../models/animale";
import {Visita} from "../../models/visita";

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
    private visiteService: GestoreEventiService
) {}

  ngOnInit(): void {
    this.animali = this.animaliService.getAnimali();
  }

  //invia richiesta di aggiunta visita
  onSubmit() {
    let visita = this.postVisitaForm.value;
    console.log("Visita da inviare", visita);
    this.visiteService.postVisita(this.postVisitaForm.value);
    this.eventoAggiuntoEmitter.emit(visita);
  }

  ngOnDestroy(): void {
  }
}
