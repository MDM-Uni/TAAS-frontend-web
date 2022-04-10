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
    public router: Router,
    private socialAuthService: SocialAuthService,
  ) { }

  ngOnInit(){
    this.dropdownUtente = new Dropdown(document.getElementById("dropdown-utente") as Element)
    this.getUtente().then()
    this.getDetailsAuth().then()
  }

  toggleDropdownUtente() {
    this.dropdownUtente.toggle()
  }

  async getUtente(){
    this.utente = JSON.parse(localStorage.getItem("utente")!);
  }

  async getDetailsAuth(){
    this.userDetails = JSON.parse(localStorage.getItem("auth")!);
  }

  logout(): void {
    this.socialAuthService.signOut().then();
    localStorage.removeItem('auth')
    localStorage.removeItem('utente')
    this.router.navigateByUrl('')
  }

}
