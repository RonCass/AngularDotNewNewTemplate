import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
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
    var myToken = this.currentUserService.getUserToken();

    return myToken;
  }

  //getHeaders() {

  //  let headers = new Headers();
  //  headers.append('Accept', 'application/json');
  //  headers.append('Content-Type', 'application/json')
  //  headers.append('Authorization', 'Bearer ' + this.getToken())
  //  return new RequestOptions({ headers: headers });

  //}

  /////////////////////////////////////////////////////////
  // Start - Auth Stuff
  /////////////////////////////////////////////////////////

  createToken(username: string, password: string): Observable<any> {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json')
    //let options = new RequestOptions({ headers: headers });

    let myJson = JSON.stringify({ 'username': username, 'password': password })

    return this.http.post(this.baseUrl + 'Auth/CreateToken',
      myJson, this.httpOptions);

  }

  //From PS Course
  getAllBooks(): Observable<Book[]> {

    return this.http.get<Book[]>('/api/books')
      .pipe(
      catchError(this.handleError)
      );

  }

  getBookById(id: number): Observable<Book> {
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

  /////////////////////////////////////////////////////////
  // ERROR HANDLING
  /////////////////////////////////////////////////////////
  //private handleError(error: HttpErrorResponse) {
  //  let errMsg: string;

  //  if (error.error instanceof ErrorEvent) {
  //    // A client-side or network error occurred. Handle it accordingly.
  //    console.error('An error occurred:', error.error.message);
  //    errMsg = "Hit Client Side or Network Error Handler";

  //  } else {
  //    // The backend returned an unsuccessful response code.
  //    // The response body may contain clues as to what went wrong,
  //    if (error.status == 500) { //Internal Server Error
  //      errMsg = 'Sorry, there was an internal server error. Please hit control-F5 to refresh the page and then try again.';
  //    }
  //    else if (error.status == 400) { //Bad Request
  //      if (error.error) {
  //        errMsg = 'Error: ' + JSON.stringify(error.error);
  //      }
  //      else {
  //        errMsg = 'Sorry, there was a problem with the data sent to the server (Bad Request Text: ' + error.statusText + '). Please hit control-F5 to refresh the page and then try again.';
  //      }
  //    }
  //    else if (error.status == 401) { //Unauthorized
  //      if (error.error) {
  //        errMsg = 'Error: ' + JSON.stringify(error.error);
  //      }
  //      else {
  //        errMsg = 'Your username or passowrd is incorrect. Please check them and try again: ' + error.statusText;
  //      }
  //    }
  //    else {
  //      if (error.error) {
  //        let body = error.error;
  //        const err = body || JSON.stringify(error.error);
  //        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //      }
  //      else {
  //        //const body = error.json() || '';
  //        //const err = body.error || JSON.stringify(body);
  //        errMsg = `${error.status} - ${error.statusText || ''} `;
  //        //errMsg = "Got Here in handleObservableError - need to fix this code";
  //      }
  //    }
  //    console.error(
  //      `Backend returned code ${error.status}, ` +
  //      `body was: ${error.error}`);
  //  }
  //  // return an ErrorObservable with a user-facing error message
  //  return new ErrorObservable(errMsg);
  //};

}
