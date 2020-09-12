import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { RCTableComponent } from './rc-table/rc-table.component';
import { RCGridColumnSortComponent } from './rc-table/components/rc-grid-column-sort/rc-grid-column-sort.component';
import { RCGridPagingComponent } from './rc-table/components/rc-grid-paging/rc-grid-paging.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MinusSignToParens } from './pipes/amount-to-parens.pipe';
import { TableFilterComponent } from './table-filter/table-filter.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
   FlexLayoutModule
  ],
  declarations: [
    NavMenuComponent,
    GridPagingComponent,
    GridColumnSortComponent,
    RCTableComponent,
    RCGridColumnSortComponent,
    RCGridPagingComponent,
    MinusSignToParens,
    TableFilterComponent
    
  ],
  exports: [
    NavMenuComponent,
    GridPagingComponent,
    GridColumnSortComponent,
    MaterialModule,
    RCTableComponent,
    RCGridColumnSortComponent,
    RCGridPagingComponent,
    FlexLayoutModule,
    MinusSignToParens,
    TableFilterComponent,
    ReactiveFormsModule
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
