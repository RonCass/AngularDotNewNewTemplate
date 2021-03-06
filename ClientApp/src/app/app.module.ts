import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http/';
import { RouterModule } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ViewLogsComponent } from './admin/view-logs/view-logs.component';
import { ToastTestComponent } from './admin/toast-test/toast-test.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';


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
    FlexLayoutModule,
    RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'viewLogs', component: ViewLogsComponent },
    { path: 'authExample', component: ViewLogsComponent, canActivate: [AuthGuard] },
    { path: 'toastTest', component: ToastTestComponent },
    { path: 'demos', loadChildren: () => import('./demos/demos.module').then(m => m.DemosModule) },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'resetPassword', component: ResetPasswordComponent }
], { relativeLinkResolution: 'legacy' }),

  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
