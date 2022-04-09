import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

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
