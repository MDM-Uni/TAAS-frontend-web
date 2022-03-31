import { Component, OnInit } from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { Utente } from '../../model/utente';
import { UtenteService } from '../../service/utente.service';
import {Animale} from "../../model/animale";

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
  ) { }

  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      localStorage.setItem("auth", JSON.stringify(data));
      this.router.navigateByUrl('/sidebar/dashboard');
    });
  }

  logout(): void {
    this.socialAuthService.signOut().then();
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
      localStorage.setItem("auth", JSON.stringify(data));
      this.router.navigateByUrl('/sidebar/dashboard');
    })
  }

}
