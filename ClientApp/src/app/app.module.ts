import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './core/services/auth-guard.service';

import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ViewLogsComponent } from './admin/view-logs/view-logs.component';
import { ToastTestComponent } from './admin/toast-test/toast-test.component';


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    FetchDataComponent,
    ViewLogsComponent,
    ToastTestComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HomeModule,
    SharedModule,
    CoreModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'viewLogs', component: ViewLogsComponent },
      { path: 'AuthExample', component: ViewLogsComponent, canLoad: [AuthGuard] },
      { path: 'toastTest', component: ToastTestComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
