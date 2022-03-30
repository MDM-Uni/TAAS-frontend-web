import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from 'angularx-social-login';

import { AppComponent } from './app.component';
import { BoxVisitaPrenComponent } from './ospedale/components/box-visita-pren/box-visita-pren.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { EventiComponent } from './ospedale/components/eventi/eventi.component';
import { VisitaItemStoriaComponent } from './ospedale/components/visita-item-storia/visita-item-storia.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { ListaProdottiComponent } from './negozio/component/lista-prodotti/lista-prodotti.component';
import { NegozioComponent } from './negozio/component/negozio/negozio.component';
import { ProdottoModalComponent } from './negozio/component/prodotto-modal/prodotto-modal.component';
import { CarrelloComponent } from './negozio/component/carrello/carrello.component';
import { CarrelloItemComponent } from './negozio/component/carrello-item/carrello-item.component';
import { LoginComponent } from './pagine/login/login.component';
import { DashboardComponent } from './pagine/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { DettagliAnimaleComponent } from './pagine/dettagli-animale/dettagli-animale.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AggiungiAnimaleComponent } from './pagine/aggiungi-animale/aggiungi-animale.component';
import { DatePipe } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OrdineComponent } from './negozio/component/ordine/ordine.component';
import "@angular/common/locales/global/it"
import {IndirizzoPipe} from "./negozio/model/indirizzo";
import { OrdineModalComponent } from './negozio/component/ordine-modal/ordine-modal.component';
import {NgxPayPalModule} from "ngx-paypal";

@NgModule({
  declarations: [
    AppComponent,
    BoxVisitaPrenComponent,
    EventiComponent,
    VisitaItemStoriaComponent,
    ListaProdottiComponent,
    NegozioComponent,
    ProdottoModalComponent,
    CarrelloComponent,
    CarrelloItemComponent,
    OrdineComponent,
    LoginComponent,
    DashboardComponent,
    DettagliAnimaleComponent,
    AggiungiAnimaleComponent,
    SidebarComponent,
    IndirizzoPipe,
    OrdineModalComponent,
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HotToastModule.forRoot(),
    NgxPayPalModule
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
  }, { provide: LOCALE_ID, useValue: 'it' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
