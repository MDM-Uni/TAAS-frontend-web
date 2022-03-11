import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Animale} from "../../model/animale";
import {Utente} from "../../model/utente";
import {UtenteService} from "../../service/utente.service";

@Component({
  selector: 'app-aggiungi-animale',
  templateUrl: './aggiungi-animale.component.html',
  styleUrls: ['./aggiungi-animale.component.css']
})
export class AggiungiAnimaleComponent implements OnInit {

  @Input() utenteCorrente: Utente;
  @Output() addA = new EventEmitter<Utente>();
  private closeResult: string;

  constructor(private modalService: NgbModal,
              private utenteService: UtenteService) { }

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

  addAnimal() {
    let nome: string = (<HTMLInputElement>document.getElementById("nome")).value;
    let razza: string = (<HTMLInputElement>document.getElementById("razza")).value;
    let peso: number = Number((<HTMLInputElement>document.getElementById("peso")).value)
    let data: Date = new Date((<HTMLInputElement>document.getElementById("data")).value);
    let patologie: Array<string> = (<HTMLInputElement>document.getElementById("patologie")).value.split(",");
    let peloLungo: boolean = (<HTMLInputElement>document.getElementById("peloLungo")).checked;
    let animale: Animale = new Animale(nome,data,patologie,razza,peso,peloLungo);
    this.utenteService.addAnimal(this.utenteCorrente,animale).subscribe(
      (response) => {
        this.addA.emit(response)
        this.modalService.dismissAll()
      },
      (err) => {
        alert(err.message);
      }
    )
  }

}
