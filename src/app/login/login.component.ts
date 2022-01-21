import { Component, OnInit } from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userDetails : any;

  constructor(
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      localStorage.setItem("google_auth", JSON.stringify(data));
      const storage = localStorage.getItem("google_auth");
      if(storage){
        this.userDetails = JSON.parse(storage);
        console.log(this.userDetails)
        console.log(this.userDetails.name + "  " + this.userDetails.email);
      } else {
      }
    });
  }

  logout(): void {
    this.socialAuthService.signOut().then();
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then();
  }

}
