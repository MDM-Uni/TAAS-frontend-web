import { NgModule } from '@angular/core';
import {LoginComponent} from "./utente/component/login/login.component";
import {DashboardComponent} from "./utente/component/dashboard/dashboard.component";
import {RouterModule, Routes} from "@angular/router";
import {SidebarComponent} from "./generale/component/sidebar/sidebar.component";

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'sidebar', component: SidebarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
