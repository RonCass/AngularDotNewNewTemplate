import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { WeatherForecast, Log } from './models';
import { CurrentUserService } from './current-user.service';
import { ToastrService } from './toastr.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class DataService {

   public baseUrl = 'http://localhost:49223/';

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

    return this.http.get<WeatherForecast>(this.baseUrl + 'api/SampleData/WeatherForecasts')
      .pipe(
      catchError(this.handleError)
      );

  }

  getLogs() {
    return this.http.get<Log>(this.baseUrl + 'api/Logs/GetLogs')
      .pipe(
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
