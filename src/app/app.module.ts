import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoxVisitaPrenComponent } from './components/box-visita-pren/box-visita-pren.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { EventiComponent } from './components/eventi/eventi.component';
import { VisitaItemClassicComponent } from './components/visita-item-classic/visita-item-classic.component';
import { VisitaItemStoriaComponent } from './components/visita-item-storia/visita-item-storia.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxVisitaPrenComponent,
    EventiComponent,
    VisitaItemClassicComponent,
    VisitaItemStoriaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent}
    ]),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
