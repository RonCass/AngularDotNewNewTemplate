import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GridListAndPagingComponent } from './grid-list-and-paging/grid-list-and-paging.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RoutingExamplesComponent } from './routing-examples/routing-examples.component';
import { DefaultRoutePageComponent } from './default-route-page/default-route-page.component';
import { RouteWithTokenComponent } from './route-with-token/route-with-token.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChildRouterOutletComponent } from './child-router-outlet/child-router-outlet.component';
import { ChildRoute1Component } from './child-route1/child-route1.component';
import { ChildRoute2Component } from './child-route2/child-route2.component';
import { GridWithSortingAndPagingComponent } from './grid-with-sorting-and-paging/grid-with-sorting-and-paging.component';
import { AngularMaterialComponent } from './angular-material/angular-material.component';
import { LoggingComponent } from './logging/logging.component';

const routes: Routes = [
  { path: '', component: DefaultRoutePageComponent },
  { path: 'fileUpload', component: FileUploadComponent },
  { path: 'gridListAndPaging', component: GridListAndPagingComponent},
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'routingExamples', component: RoutingExamplesComponent},
  { path: 'gridWithSortingAndPaging', component: GridWithSortingAndPagingComponent},
  { path: 'routingWithToken/:token', component: RouteWithTokenComponent},
  { path: 'childRouterOutlet', component: ChildRouterOutletComponent,
      children: [
        { path: '', component: ChildRoute1Component},
        { path: 'childRoute1', component: ChildRoute1Component},
        { path: 'childRoute2', component: ChildRoute2Component}
      ]
  },
  { path: 'angularMaterial', component: AngularMaterialComponent},
  { path: 'logging', component: LoggingComponent},
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemosRoutingModule { }
