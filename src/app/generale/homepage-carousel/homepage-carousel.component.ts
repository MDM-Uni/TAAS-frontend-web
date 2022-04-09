import {Component, OnInit} from '@angular/core';
import {Carousel} from "bootstrap";

@Component({
  selector: 'app-homepage-carousel',
  templateUrl: './homepage-carousel.component.html',
  styleUrls: ['./homepage-carousel.component.css']
})
export class HomepageCarouselComponent implements OnInit {
  id = 'carousel';
  carousel: Carousel;
  slideCorrente = 0;
  slides = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Wide_lightning.jpg',
      titolo: 'Titolo 1',
      desc: 'Descrizione 1',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Wide_lightning.jpg',
      titolo: 'Titolo 2',
      desc: 'Descrizione 2',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Wide_lightning.jpg',
      titolo: 'Titolo 3',
      desc: 'Descrizione 3',
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.carousel = new Carousel(document.getElementById(this.id) as Element, {interval: false})
  }

  avanti() {
    this.carousel = new Carousel(document.getElementById(this.id) as Element, {interval: false})
    this.carousel.next()
    this.slideCorrente = (this.slideCorrente + 1) % this.slides.length
  }

  indietro() {
    this.carousel = new Carousel(document.getElementById(this.id) as Element, {interval: false})
    this.carousel.prev()
    this.slideCorrente -= 1
    this.slideCorrente = this.slideCorrente < 0 ? this.slides.length + this.slideCorrente : this.slideCorrente
  }

  vaiA(i: number) {
    this.carousel = new Carousel(document.getElementById(this.id) as Element, {interval: false})
    this.carousel.to(i)
    this.slideCorrente = i
  }
}
