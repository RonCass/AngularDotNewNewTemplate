import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { RouterModule } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthGuard } from './core/services/auth-guard.service';

import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ViewLogsComponent } from './admin/view-logs/view-logs.component';
import { ToastTestComponent } from './admin/toast-test/toast-test.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewLogsComponent,
    ToastTestComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HomeModule,
    SharedModule,
    CoreModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'viewLogs', component: ViewLogsComponent },
      { path: 'authExample', component: ViewLogsComponent, canActivate: [AuthGuard] },
      { path: 'toastTest', component: ToastTestComponent },
      { path: 'demos', loadChildren: './demos/demos.module#DemosModule'
      }
    ]),

  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
