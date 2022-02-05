import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreVisiteService} from "../../services/gestore-visite/gestore-visite.service";

@Component({
  selector: 'app-box-visita-pren',
  templateUrl: './box-visita-pren.component.html',
  styleUrls: ['./box-visita-pren.component.css']
})
export class BoxVisitaPrenComponent implements OnInit {
  idAnimali = this.animaliService.getIdAnimali();
  postVisitaForm = this.formBuilder.group({
    tipoVisita:"",
    idAnimale:"",
    data:"",
    durataInMinuti:0,
    note:""
  });


  constructor(
    private formBuilder: FormBuilder,
    private animaliService: GestoreAnimaliService,
    private visiteService: GestoreVisiteService
) { }

  ngOnInit(): void {
  }

  onSubmit() {
  this.visiteService.postVisita(this.postVisitaForm.value);
  }
}
