import { Component, OnInit } from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { Utente } from '../utente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userDetails : any;

  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      localStorage.setItem("google_auth", JSON.stringify(data));
      this.router.navigate(['/dashboard']).then();
    });
  }

  logout(): void {
    this.socialAuthService.signOut().then();
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then();
  }

}
