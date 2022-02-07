import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";

@Component({
  selector: 'app-box-visita-pren',
  templateUrl: './box-visita-pren.component.html',
  styleUrls: ['./box-visita-pren.component.css']
})
export class BoxVisitaPrenComponent implements OnInit, OnDestroy {
  animali;
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
) { }

  ngOnInit(): void {
    this.animali = this.animaliService.getAnimali();
  }

  onSubmit() {
    console.log(this.postVisitaForm.value);
    this.visiteService.postVisita(this.postVisitaForm.value);
  }

  ngOnDestroy(): void {
    this.animali.unsubscribe();
  }
}
