import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Animale } from '../../model/animale';
import { Utente } from '../../model/utente';
import {UtenteService} from "../../service/utente.service";
import {HttpClient} from "@angular/common/http";
import { formatDate } from "@angular/common";
import { DatePipe } from '@angular/common'
import {Router} from "@angular/router";

@Component({
  selector: 'app-dettagli-animale',
  templateUrl: './dettagli-animale.component.html',
  styleUrls: ['./dettagli-animale.component.css']
})
export class DettagliAnimaleComponent implements OnInit {

  closeResult: string;

  @Input() animaleDaVisualizzare: Animale;
  @Input() utenteCorrente: Utente;

  @Output() updateA = new EventEmitter<Animale>();
  maxDate = new Date().toISOString();

  constructor(
    private modalService: NgbModal,
    private utenteService: UtenteService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  open(content:any): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  updateAnimal() {
    let nome: string = (<HTMLInputElement>document.getElementById("nome")).value;
    let razza: string = (<HTMLInputElement>document.getElementById("razza")).value;
    let peso: number = Number((<HTMLInputElement>document.getElementById("peso")).value)
    let data: Date = new Date((<HTMLInputElement>document.querySelector('input[id="data"]')).value);
    let peloLungo: boolean = (<HTMLInputElement>document.getElementById("pelolungo")).checked;
    const animale: Animale = new Animale(nome,data,this.animaleDaVisualizzare.patologie,razza,peso,peloLungo);

    if(nome.length > 0){
      this.utenteService.updateAnimal(this.utenteCorrente,this.animaleDaVisualizzare,animale).subscribe(
        (response) => {
          this.updateA.emit(response)
          this.modalService.dismissAll()
        },
        (err) => {
          alert("Il campo Data ?? obbligatorio");
        }
      )
    } else {
      alert("Il campo Nome ?? obbligatorio");
    }

  }

  addPatologia() {
    this.animaleDaVisualizzare.patologie.push("");
  }

  removePatologia(i: number) {
    if(i>0) this.animaleDaVisualizzare.patologie.splice(i,1);
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

}
