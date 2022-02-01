import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userDetails: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');
    if(storage){
      this.userDetails = JSON.parse(storage);
      console.log(this.userDetails);
    } else { this.signOut();}
  }

  signOut(): void {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/login').then();
  }

}
