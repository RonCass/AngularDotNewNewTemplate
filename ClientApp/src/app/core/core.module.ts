import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentUserService } from './services/current-user.service';
import { DataService } from './services/data.service';
import { ToastrService } from './services/toastr.service';
import { AuthGuard } from './services/auth-guard.service';
// import { AddHeaderInteceptor } from './services/add-header.interceptor';
// import { transition } from '@angular/core/src/animation/dsl';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogResponseInterceptor } from './services/log-response.interceptor';

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
        // { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInteceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true }
      ]
    };
  }}
