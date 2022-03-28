import { NgModule } from '@angular/core';
import {LoginComponent} from "./utente/component/login/login.component";
import {DashboardComponent} from "./utente/component/dashboard/dashboard.component";
import {RouterModule, Routes} from "@angular/router";
import {SidebarComponent} from "./generale/sidebar/sidebar.component";
import {StoriaComponent} from "./storia/components/storia/storia.component";
import {OspedaleComponent} from "./ospedale/components/ospedale/ospedale.component";

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'sidebar', component: SidebarComponent},
  {path:'storia', component: StoriaComponent},
  {path:'ospedale', component: OspedaleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
