import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { GridPagingComponent } from './grid-paging/grid-paging.component';
import { GridColumnSortComponent } from './grid-column-sort/grid-column-sort.component';
import { MaterialModule } from './material.module';
import { DataService } from './services/data.service';
import { CurrentUserService } from './services/current-user.service';
import { ToastrService } from './services/toastr.service';
import { AuthGuard } from './services/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogResponseInterceptor } from './services/log-response.interceptor';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
   MaterialModule
  ],
  declarations: [
    NavMenuComponent,
    GridPagingComponent,
    GridColumnSortComponent
  ],
  exports: [
    NavMenuComponent,
    GridPagingComponent,
    GridColumnSortComponent,
    MaterialModule
  ],
  providers: [
    DataService,
    CurrentUserService,
    ToastrService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true }
  ]
})
export class SharedModule { }
