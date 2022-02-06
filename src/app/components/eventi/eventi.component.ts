import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GestoreAnimaliService} from "../../services/gestore-animali/gestore-animali.service";
import {GestoreVisiteService} from "../../services/gestore-visite/gestore-visite.service";

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit {
  filterForm= this.formBuilder.group({
    "animaleId":0,
    "tipoEvento":"",
  });
  animali = this.animaliService.getAnimali();

  constructor(
    private formBuilder: FormBuilder,
    private animaliService: GestoreAnimaliService,
    private visiteService: GestoreVisiteService
) { }

  ngOnInit(): void {
  }

}
