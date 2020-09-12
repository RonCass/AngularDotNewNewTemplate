import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminMainComponent } from './admin-main.component';
import { UsersListComponent } from './users/users-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserModalComponent } from './user-modal/user-modal.component';

@NgModule({
  declarations: [
    AdminMainComponent,
    UsersListComponent,
    UserModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
    
  ]
})
export class AdminModule { }
