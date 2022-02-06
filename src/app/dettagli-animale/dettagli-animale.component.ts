import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Animale } from '../animale';

@Component({
  selector: 'app-dettagli-animale',
  templateUrl: './dettagli-animale.component.html',
  styleUrls: ['./dettagli-animale.component.css']
})
export class DettagliAnimaleComponent implements OnInit {

  closeResult: string;

  @Input() animaleDaVisualizzare: Animale;

  constructor(private modalService: NgbModal) { }

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

}
