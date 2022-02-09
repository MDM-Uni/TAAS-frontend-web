import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Animale } from '../animale';
import { Utente } from '../utente';
import {UtenteService} from "../utente.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dettagli-animale',
  templateUrl: './dettagli-animale.component.html',
  styleUrls: ['./dettagli-animale.component.css']
})
export class DettagliAnimaleComponent implements OnInit {

  closeResult: string;
  modifica: String = 'modifica';
  aggiungi: String = "aggiungi";

  @Input() animaleDaVisualizzare: Animale;
  @Input() utenteCorrente: Utente;

  constructor(
    private modalService: NgbModal,
    private utenteService: UtenteService,
    private http: HttpClient
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
    let data: Date = new Date((<HTMLInputElement>document.getElementById("data")).value);
    let patologie: Array<string> = (<HTMLInputElement>document.getElementById("patologie")).value.split(",");
    let peloLungo: boolean;

    /*
    let valueC;
    if(this.animaleDaVisualizzare.peloLungo){
      valueC = (<HTMLInputElement>document.getElementById("peloLungoSi")).value;
    } else (valueC = (<HTMLInputElement>document.getElementById("peloLungoNo")))
    if(valueC === "true"){
      peloLungo = true;
    }*/
    peloLungo = false;
    let animale: Animale = new Animale(nome,data,patologie,razza,peso,peloLungo);
    this.utenteService.updateAnimal(this.utenteCorrente,this.animaleDaVisualizzare,animale).subscribe(data => {
      this.utenteCorrente.animali.forEach((element,index) => {
        if(element.id === animale.id) delete this.utenteCorrente.animali[index];
      })
      this.utenteCorrente.animali.push(animale);
      window.location.reload();
    })
  }

  addAnimal() {
    let nome: string = (<HTMLInputElement>document.getElementById("nome")).value;
    let razza: string = (<HTMLInputElement>document.getElementById("razza")).value;
    let peso: number = Number((<HTMLInputElement>document.getElementById("peso")).value)
    let data: Date = new Date((<HTMLInputElement>document.getElementById("data")).value);
    let patologie: Array<string> = (<HTMLInputElement>document.getElementById("patologie")).value.split(",");
    let peloLungo: boolean;
    peloLungo = false;
    let animale: Animale = new Animale(nome,data,patologie,razza,peso,peloLungo);

    this.utenteService.addAnimal(this.utenteCorrente,animale).subscribe(data => {
      this.utenteCorrente.animali.push(animale);
      window.location.reload();
    })


  }
}
