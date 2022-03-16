import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoxVisitaPrenComponent } from './ospedale/components/box-visita-pren/box-visita-pren.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { EventiComponent } from './ospedale/components/eventi/eventi.component';
import { VisitaItemStoriaComponent } from './ospedale/components/visita-item-storia/visita-item-storia.component';
import { HotToastModule } from '@ngneat/hot-toast';
import {DatePipe} from "@angular/common";
import {googleCalendarEventUrl} from "google-calendar-url";
import { BoxAggiuntaEventoPersComponent } from './ospedale/components/box-aggiunta-evento-pers/box-aggiunta-evento-pers.component';
import { EventoPersonalizzatoComponent } from './ospedale/components/evento-personalizzato/evento-personalizzato.component';
import { CardEventoComponent } from './ospedale/components/card-evento/card-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxVisitaPrenComponent,
    EventiComponent,
    VisitaItemStoriaComponent,
    BoxAggiuntaEventoPersComponent,
    EventoPersonalizzatoComponent,
    CardEventoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent}
    ]),
    ReactiveFormsModule,
    FormsModule,
    HotToastModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
