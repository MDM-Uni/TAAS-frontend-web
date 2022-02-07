import {Component, OnDestroy, OnInit, Optional} from '@angular/core';
import {FormBuilder} from "@angular/forms";
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
export class EventiComponent implements OnInit, OnDestroy {
  filterForm= this.formBuilder.group({
    "idAnimale":0,
    "tipoEvento":"",
  });
  animali!: Observable<Animale[]>;
  eventi!: Observable<Visita[]>;

  constructor(
    private formBuilder: FormBuilder,
    private animaliService: GestoreAnimaliService,
    private gestoreEventiService: GestoreEventiService
) {
  }

  ngOnInit(): void {
    this.animali = this.animaliService.getAnimali();
    this.eventi = this.gestoreEventiService.getVisite();
  }

  onSubmit() {

  }

  ngOnDestroy(): void {
  }

}
