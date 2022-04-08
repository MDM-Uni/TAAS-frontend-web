import { NgModule } from '@angular/core';
import {LoginComponent} from "./utente/component/login/login.component";
import {DashboardComponent} from "./utente/component/dashboard/dashboard.component";
import {RouterModule, Routes} from "@angular/router";
import {SidebarComponent} from "./generale/sidebar/sidebar.component";
import {StoriaComponent} from "./storia/components/storia/storia.component";
import {OspedaleComponent} from "./ospedale/components/ospedale/ospedale.component";
import { NegozioComponent } from './negozio/component/negozio/negozio.component';
import {ListaProdottiComponent} from "./negozio/component/lista-prodotti/lista-prodotti.component";
import {OrdineComponent} from "./negozio/component/ordine/ordine.component";
import {CarrelloComponent} from "./negozio/component/carrello/carrello.component";
import {HomepageComponent} from "./generale/homepage/homepage.component";

const routes: Routes = [
  {path:'', component: HomepageComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: SidebarComponent, children: [
      {path:'dashboard', component: DashboardComponent},
      {path:'storia', component: StoriaComponent},
      {path:'ospedale', component: OspedaleComponent},
      {path:'', component: NegozioComponent, children: [
        {path:'negozio', component: ListaProdottiComponent},
        {path:'ordini', component: OrdineComponent},
        {path:'carrello', component: CarrelloComponent},
        ]},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
