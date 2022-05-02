import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  slidesNegozio = [
    {
      src: 'assets/images/shop1.jpg',
      titolo: 'Titolo 1',
      desc: 'Descrizione 1',
    },
    {
      src: 'assets/images/shop2.jpg',
      titolo: 'Titolo 2',
      desc: 'Descrizione 2',
    },
  ];

  slidesOspedale = [
    {
      src: 'assets/images/hospital1.jpg',
      titolo: 'Titolo 1',
      desc: 'Descrizione 1',
    },
    {
      src: 'assets/images/hospital2.jpg',
      titolo: 'Titolo 2',
      desc: 'Descrizione 2',
    },
  ];

   slidesPensione = [
    {
      src: 'assets/images/house1.jpg',
      titolo: 'Titolo 1',
      desc: 'Descrizione 1',
    },
    {
      src: 'assets/images/house2.jpg',
      titolo: 'Titolo 2',
      desc: 'Descrizione 2',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['event'])
  onScroll() {
    let elem = document.getElementById('cardStrutture')!
    let top = elem.getBoundingClientRect().top
    let height = window.innerHeight
    if (top <= height) {
      elem.classList.add('fadein')
      elem.style.opacity = "1"
    }
  }
}
