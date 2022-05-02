import {Component, Input, OnInit} from '@angular/core';
import {Carousel} from "bootstrap";

@Component({
  selector: 'app-homepage-carousel',
  templateUrl: './homepage-carousel.component.html',
  styleUrls: ['./homepage-carousel.component.css']
})
export class HomepageCarouselComponent implements OnInit {
  @Input() id: string;
  @Input() slides: Array<{src: string, titolo: string, desc: string}>;
  carousel: Carousel;
  slideCorrente = 0;

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
