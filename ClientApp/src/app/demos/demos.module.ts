import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DemosRoutingModule } from './demos-routing.module';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    DemosRoutingModule,
    FormsModule
  ],
  declarations: [
    FileUploadComponent
  ]
})
export class DemosModule { }
