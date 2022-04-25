import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../../storia/services/gestore-eventi/gestore-eventi.service";
import {map, Observable, tap} from "rxjs";
import {Animale} from "../../models/animale";
import {Visita} from "../../models/visita";
import {HotToastService} from "@ngneat/hot-toast";
import {GestoreVisiteService} from "../../services/gestore-visite/gestore-visite.service";

let valoriInizialiVisita = {
  data:"",
  durataInMinuti:30,
  note:"",
  tipoVisita:"VACCINO",
  idAnimale: 0
};

@Component({
  selector: 'app-box-visita-pren',
  templateUrl: './box-visita-pren.component.html',
  styleUrls: ['./box-visita-pren.component.css']
})
export class BoxVisitaPrenComponent implements OnInit, OnDestroy {
  animali!: Animale[];
  @Output() visitaAggiuntaEmitter = new EventEmitter<Visita>();

  postVisitaForm = this.formBuilder.group(valoriInizialiVisita);


  constructor(
    private formBuilder: FormBuilder,
    private animaliService: GestoreAnimaliService,
    private visiteService: GestoreVisiteService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.animali = this.animaliService.getAnimaliUtente();
  }

  //invia richiesta di aggiunta visita
  onSubmit() {
    if (this.postVisitaForm.get('idAnimale')!.value < 0) {
      this.toast.error('Seleziona un animale');
      return;
    }
    if(this.postVisitaForm.get('data')!.value === ''){
      this.toast.error('Inserisci una data');
      return;
    }
    let data_ = new Date(Date.parse(this.postVisitaForm.get('data')!.value));
    if (data_.getTime() < BoxVisitaPrenComponent.getDataMinima().getTime()) {
      this.toast.error('La visita non può essere prenotata per oggi o prima');
      return;
    }
    if (this.postVisitaForm.get('durataInMinuti')!.value <= 0) {
      this.toast.error('Inserisci una durata valida');
      return;
    }
    if (this.postVisitaForm.get('tipoVisita')!.value === '') {
      this.toast.error('Seleziona una tipologia di visita');
      return;
    }
    let visita = this.postVisitaForm.value;
    // console.log("Visita da inviare", visita);
    let risultato = this.visiteService.postVisita(this.postVisitaForm.value);
    risultato = risultato.pipe(
      this.toast.observe({
         loading: 'Sto verificando la disponibilità...',
         success: 'Visita registrata con successo!',
         error: 'Qualcosa è andato storto!'
      })
    );
    risultato.pipe(
      map((id) => visita.id=id),
      //tap((id) => console.log("Visita aggiunta con id: ", id))
    ).subscribe({
      next: (data) => {
        this.visitaAggiuntaEmitter.emit(visita);
        this.postVisitaForm.reset(valoriInizialiVisita);
      },
    });
  }

  ngOnDestroy(): void {
  }

  private static getDataMinima() {
    let oggi = new Date(Date.now());
    oggi.setDate(oggi.getDate() + 1);
    let domani = oggi;
    domani.setHours(0,0,0,0);
    return domani;
  }
}
