import { NgModule } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
