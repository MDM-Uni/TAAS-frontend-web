import { NgModule } from '@angular/core';
import {LoginComponent} from "./pagine/login/login.component";
import {DashboardComponent} from "./pagine/dashboard/dashboard.component";
import {RouterModule, Routes} from "@angular/router";
import {SidebarComponent} from "./sidebar/sidebar.component";

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
