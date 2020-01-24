import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { GridPagingComponent } from './grid-paging/grid-paging.component';
import { GridColumnSortComponent } from './grid-column-sort/grid-column-sort.component';
import { MaterialModule } from './material.module';



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
  ]
})
export class SharedModule { }
