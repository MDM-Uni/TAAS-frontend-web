import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoxVisitaPrenComponent } from './components/box-visita-pren/box-visita-pren.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { EventiComponent } from './components/eventi/eventi.component';
import { VisitaItemStoriaComponent } from './components/visita-item-storia/visita-item-storia.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { ListaProdottiComponent } from './negozio/component/lista-prodotti/lista-prodotti.component';
import { NegozioComponent } from './negozio/component/negozio/negozio.component';
import { ProdottoModalComponent } from './negozio/component/prodotto-modal/prodotto-modal.component';
import { CarrelloComponent } from './negozio/component/carrello/carrello.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxVisitaPrenComponent,
    EventiComponent,
    VisitaItemStoriaComponent,
    ListaProdottiComponent,
    NegozioComponent,
    ProdottoModalComponent,
    CarrelloComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
