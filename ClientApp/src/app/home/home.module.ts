import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { FocusDirective } from './../shared/directives/focus.directive';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    FocusDirective
  ]
})
export class HomeModule { }
