import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentUserService } from './services/current-user.service';
import { DataService } from './services/data.service';
import { ToastrService } from './services/toastr.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        CurrentUserService,
        DataService,
        ToastrService,
        AuthGuard,

      ]
    };
  }}
