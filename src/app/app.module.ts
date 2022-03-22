import { NgModule } from '@angular/core';
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
import { EventiComponent } from './storia/components/eventi/eventi.component';
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
import {googleCalendarEventUrl} from "google-calendar-url";
import { BoxAggiuntaEventoPersComponent } from './storia/components/box-aggiunta-evento-pers/box-aggiunta-evento-pers.component';
import { EventoPersonalizzatoComponent } from './storia/components/evento-personalizzato/evento-personalizzato.component';
import { OspedaleComponent } from './ospedale/components/ospedale/ospedale.component';
import { StoriaComponent } from './storia/components/storia/storia.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxVisitaPrenComponent,
    EventiComponent,
    VisitaItemStoriaComponent,
    BoxAggiuntaEventoPersComponent,
    EventoPersonalizzatoComponent,
    OspedaleComponent,
    StoriaComponent,
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
    HotToastModule.forRoot()
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
