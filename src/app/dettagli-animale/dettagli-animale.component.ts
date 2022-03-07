import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Animale } from '../animale';
import { Utente } from '../utente';
import {UtenteService} from "../utente.service";
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
    let patologie: Array<string> = (<HTMLInputElement>document.getElementById("patologie")).value.split(",");
    let peloLungo: boolean = (<HTMLInputElement>document.getElementById("pelolungo")).checked;
    const animale: Animale = new Animale(nome,data,patologie,razza,peso,peloLungo);

    this.utenteService.updateAnimal(this.utenteCorrente,this.animaleDaVisualizzare,animale).subscribe(
      (response) => {
        this.updateA.emit(response)
        this.modalService.dismissAll()
      },
      (err) => {
        alert(err.message);
      }
    )

  }

}
