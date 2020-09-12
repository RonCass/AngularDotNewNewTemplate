import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMainComponent } from './admin-main.component';
import { UsersListComponent } from './users/users-list.component';


const routes: Routes = [
  { path: '', component: AdminMainComponent },
  { path: 'users', component: UsersListComponent },
  //{ path: 'authExample', component: ViewLogsComponent, canActivate: [AuthGuard] },
  //{ path: 'toastTest', component: ToastTestComponent },
  //{
  //  path: 'demos', loadChildren: () => import('./demos/demos.module').then(m => m.DemosModule)
  //}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
