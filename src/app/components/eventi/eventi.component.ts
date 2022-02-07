import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";
import {Observable} from "rxjs";
import {Evento} from "../../models/evento";

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit, OnDestroy {
  filterForm= this.formBuilder.group({
    "animaleId":0,
    "tipoEvento":"",
  });
  animali;
  eventi: Observable<Evento[]>;
  constructor(
    private formBuilder: FormBuilder,
    private animaliService: GestoreAnimaliService,
    private gestoreEventiService: GestoreEventiService
) { }

  ngOnInit(): void {
    this.animali = this.animaliService.getAnimali();
    this.eventi = this.gestoreEventiService.getVisite();
  }

  onSubmit() {

  }

  ngOnDestroy(): void {
    this.animali.unsubscribe();
    this.eventi.unsubscribe();
  }
}
