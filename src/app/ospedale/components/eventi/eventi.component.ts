import {Component, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";
import {Observable, Subscription} from "rxjs";
import {Evento} from "../../models/evento";
import {Visita} from "../../models/visita";
import {Animale} from "../../models/animale";

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit, OnDestroy, OnChanges {
  filterForm = this.formBuilder.group({
    "idAnimale":0,
    "tipoEvento":"",
    "tipoVisita":"",
  });
  animali!: Animale[];
  eventi!: Visita[];
  private animaliSub!: Subscription;
  private eventiSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private animaliService: GestoreAnimaliService,
    private gestoreEventiService: GestoreEventiService
) {
  }

  ngOnInit(): void {
    this.animaliSub = this.animaliService.getAnimali().subscribe({
      next: (animali: Animale[]) => {
        this.animali = animali;
      }
    });
    this.eventiSub = this.gestoreEventiService.getVisite().subscribe({
      next: (visite: Visita[]) => {
        this.eventi = visite;
      }
    });
  }

  onSubmitFilterForm() {
    this.eventiSub.unsubscribe();
    this.eventiSub = this.gestoreEventiService.getVisite(this.filterForm.get("idAnimale")!.value, this.filterForm.get("tipoVisita")!.value).subscribe({
      next: (visite: Visita[]) => {
        this.eventi = visite;
      }
    });
  }

  ngOnDestroy(): void {
    this.animaliSub.unsubscribe();
    this.eventiSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filterForm.get("tipoEvento")!.value != "visita") {
      this.filterForm.setControl("tipoVisita", new FormControl(""));
    }
  }

  handleVisitaEliminata(visita: Visita) {
    console.log("Sto eliminando la visita");
    //elimino persistente
    this.gestoreEventiService.deleteVisita(visita);
    //elimino localmente
    let index = this.eventi.indexOf(visita);
    if (index!=-1) {
      let eliminato = this.eventi.splice(index,1);
      console.log("Eliminata la visita: " + eliminato);
    }
  }
}
