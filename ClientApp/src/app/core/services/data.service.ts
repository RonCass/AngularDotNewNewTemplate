import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { WeatherForecast } from './models';
import { CurrentUserService } from './current-user.service';
import { ToastrService } from './toastr.service';

@Injectable()
export class DataService {

  public baseUrl = 'http://localhost:49431/';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private currentUserService: CurrentUserService, private toastrService: ToastrService) { }

    getToken() {
        var myToken = this.currentUserService.getUserToken();
        
        return myToken;
    }

    getHeaders() {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', 'Bearer ' + this.getToken())
        return new RequestOptions({ headers: headers });

    }

  GetSomething() {

    return this.http.get<WeatherForecast>(this.baseUrl + 'api/SampleData/WeatherForecasts');

  }

  



}
