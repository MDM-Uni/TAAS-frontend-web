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
  patologie = [""];
  maxDate = new Date().toISOString();

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
    //let patologie: Array<string> = (<HTMLInputElement>document.getElementById("patologie")).value.split(",");
    let peloLungo: boolean = (<HTMLInputElement>document.getElementById("peloLungo")).checked;
    let animale: Animale = new Animale(nome,data,this.patologie,razza,peso,peloLungo);

    if(nome.length > 0){
      this.utenteService.addAnimal(this.utenteCorrente,animale).subscribe(
        (response) => {
          this.patologie = [''];
          this.addA.emit(response)
          this.modalService.dismissAll()
        },
        (err) => {
          alert("Il campo Data è obbligatorio");
        }
      )
    } else {
      alert("Il campo Nome è obbligatorio");
    }

  }

  addPatologia() {
    this.patologie.push("");
  }

  removePatologia(i: number) {
    if(i>0) this.patologie.splice(i,1);
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

}
