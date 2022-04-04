import { Component, OnInit } from '@angular/core';
import {Dropdown} from "bootstrap";
import {Router} from "@angular/router";
import {Utente} from "../../utente/model/utente";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private dropdownUtente: Dropdown;
  public utente : Utente;
  public userDetails: any;

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) { }

  ngOnInit(): void {
    this.dropdownUtente = new Dropdown(document.getElementById("dropdown-utente") as Element)
    const session = localStorage.getItem("user")
    const logDetails = localStorage.getItem("auth")
    if(session != null && logDetails != null){
      this.utente = JSON.parse(session);
      this.userDetails = JSON.parse(logDetails);
    }
  }

  toggleDropdownUtente() {
    this.dropdownUtente.toggle()
  }

  logout(): void {
    this.socialAuthService.signOut().then();
    localStorage.removeItem('auth')
    this.router.navigateByUrl('')
  }

}
