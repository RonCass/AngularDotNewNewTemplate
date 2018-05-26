import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GridListAndPagingComponent } from './grid-list-and-paging/grid-list-and-paging.component';

const routes: Routes = [
  { path: 'fileUpload', component: FileUploadComponent },
  { path: 'gridListAndPaging', component: GridListAndPagingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemosRoutingModule { }
