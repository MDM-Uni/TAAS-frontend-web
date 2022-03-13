import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from 'angularx-social-login';

import { AppComponent } from './app.component';
import { LoginComponent } from './utente/component/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './utente/component/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { DettagliAnimaleComponent } from './utente/component/dettagli-animale/dettagli-animale.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AggiungiAnimaleComponent } from './utente/component/aggiungi-animale/aggiungi-animale.component';
import { DatePipe } from '@angular/common';
import { SidebarComponent } from './generale/component/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DettagliAnimaleComponent,
    AggiungiAnimaleComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocialLoginModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
  ],
  providers: [
    DatePipe,
    {
    provide: "SocialAuthServiceConfig",
    useValue: {
      autologin: true,
      providers: [{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '544771957287-ip31rgvl3h0u8vhuv788u5lcuj8pbqfl.apps.googleusercontent.com'
        )
      }, {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(
          '246239551009960'
        )
      }]
    } as SocialAuthServiceConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
