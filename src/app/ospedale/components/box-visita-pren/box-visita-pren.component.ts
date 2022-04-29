import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../../storia/services/gestore-eventi/gestore-eventi.service";
import {map, Observable, tap} from "rxjs";
import {Animale} from "../../models/animale";
import {Visita} from "../../models/visita";
import {HotToastService} from "@ngneat/hot-toast";
import {GestoreVisiteService} from "../../services/gestore-visite/gestore-visite.service";

@Component({
  selector: 'app-box-visita-pren',
  templateUrl: './box-visita-pren.component.html',
  styleUrls: ['./box-visita-pren.component.css']
})
export class BoxVisitaPrenComponent implements OnInit, OnDestroy {
  animali!: Animale[];
  @Output() visitaAggiuntaEmitter = new EventEmitter<Visita>();

  postVisitaForm = new FormGroup({});


  constructor(
    private formBuilder: FormBuilder,
    private animaliService: GestoreAnimaliService,
    private visiteService: GestoreVisiteService,
    private toast: HotToastService
  ) {}

  get data(): FormGroup {
    return this.postVisitaForm.get('data')! as FormGroup;
  }

  ngOnInit(): void {
    this.formBuilder.group({
    data: this.formBuilder.group(
      new Date(Date.now()), {
        validators: [Validators.required, this.validaMinData()],
        updateOn: 'change'
      }),
    durataInMinuti:[30, Validators.required],
    note:"",
    tipoVisita:["VACCINO", Validators.required],
    idAnimale: [0, Validators.required]
  });
    this.animali = this.animaliService.getAnimaliUtente();
  }

  //invia richiesta di aggiunta visita
  onSubmit() {
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
        this.postVisitaForm.reset();
      },
    });
  }

  validaMinData() {
    return (control: AbstractControl): ValidationErrors | null => {
      const data : Date = control.value;
      console.log("data passata al validatore", data);
      //data minima domani alle 00:00
      let dataMinima = new Date(Date.now());
      dataMinima.setDate(dataMinima.getDate() + 1);
      dataMinima.setHours(0,0,0,0);
      console.log("Data minima: " + dataMinima);
      if (data.getTime() < dataMinima.getTime()) {
        this.toast.error('La data della visita non può essere prima di oggi stesso (escluso)');
        return {data: {value: control.value}};
      } else {
        return null;
      }
    };
  }

  ngOnDestroy(): void {
  }

  private checkRequired() {

  }
}
