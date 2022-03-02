import { Component, OnInit } from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { Utente } from '../utente';
import { UtenteService } from '../utente.service';
import {Animale} from "../animale";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userDetails : any;
  public animali: Animale[];

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private utenteService: UtenteService
  ) { }

  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      localStorage.setItem("auth", JSON.stringify(data));
      console.log(localStorage.getItem("auth"));
      this.router.navigate(['/dashboard']).then();
    });
  }

  logout(): void {
    this.socialAuthService.signOut().then();
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
      localStorage.setItem("auth", JSON.stringify(data));
      this.router.navigate(['/dashboard']).then();
    })
  }

}
