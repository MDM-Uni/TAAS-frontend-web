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
  animali = this.animaliService.getAnimali();
  postVisitaForm = this.formBuilder.group({
    data:"",
    durataInMinuti:0,
    note:"",
    tipoVisita:"",
    idAnimale:""
  });


  constructor(
    private formBuilder: FormBuilder,
    private animaliService: GestoreAnimaliService,
    private visiteService: GestoreVisiteService
) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.postVisitaForm.value);
    //this.visiteService.postVisita(this.postVisitaForm.value);
  }
}
