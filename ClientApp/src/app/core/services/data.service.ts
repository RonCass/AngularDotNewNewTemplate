import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Headers, Response, RequestOptions } from '@angular/http';

import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { WeatherForecast, Log, Book } from './models';
import { CurrentUserService } from './current-user.service';
import { ToastrService } from './toastr.service';


@Injectable()
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    })
  };

   public baseUrl = 'http://localhost:49223/';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private currentUserService: CurrentUserService, private toastrService: ToastrService) { }

  getToken() {
    const myToken = this.currentUserService.getUserToken();

    return myToken;
  }

  // getHeaders() {

  //  let headers = new Headers();
  //  headers.append('Accept', 'application/json');
  //  headers.append('Content-Type', 'application/json')
  //  headers.append('Authorization', 'Bearer ' + this.getToken())
  //  return new RequestOptions({ headers: headers });

  // }

  /////////////////////////////////////////////////////////
  // Start - Auth Stuff
  /////////////////////////////////////////////////////////

  createToken(username: string, password: string): Observable<any> {

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json')
    // let options = new RequestOptions({ headers: headers });

    const myJson = JSON.stringify({ 'username': username, 'password': password })

    return this.http.post(this.baseUrl + 'Auth/CreateToken',
      myJson, this.httpOptions);
  }

  // From PS Course
  getAllBooks() {

    return this.http.get<Book[]>('/api/books')
      .pipe(
        catchError(this.handleError)
      );

  }

  getBookById(id: number) {
    return this.http.get<Book>('/api/books/${id}', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  GetSomething() {

    return this.http.get<WeatherForecast>(this.baseUrl + 'api/SampleData/WeatherForecasts', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLogs() {
    return this.http.get<Log>(this.baseUrl + 'api/Logs/GetLogs', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /////////////////////////////////////////////////////////
  // ERROR HANDLING
  /////////////////////////////////////////////////////////
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
    // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
  }

}
