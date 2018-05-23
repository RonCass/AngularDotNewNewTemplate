import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { WeatherForecast, Log, Book } from './models';
import { CurrentUserService } from './current-user.service';
import { ToastrService } from './toastr.service';
import { RequestOptions } from '@angular/http';


@Injectable()
export class DataService {  

  public baseUrl = 'http://localhost:56789/'; // 'http://localhost:49223/';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private currentUserService: CurrentUserService, private toastrService: ToastrService) { }

  getToken() {
    const myToken = this.currentUserService.getUserToken();
    return myToken;
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
  }

   // Cant submit document saying its JSON data so have to remove that line from the headers
  getHttpOptionsWithoutContentType() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',        
        'Authorization': 'Bearer ' + this.getToken()
      })
    };

  // 'Content-Type': 'multipart/form-data',
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
      myJson, this.getHttpOptions());
  }

  /////////////////////////////////////////////////////////
  // START - File Upload
  /////////////////////////////////////////////////////////
 
  UploadOneFileOnly(formData) {

    return this.http.post(this.baseUrl + 'api/FileUpload/UploadOneFileOnly/', formData, this.getHttpOptionsWithoutContentType())
      .pipe(
        catchError(this.handleError)
      );
  }
  UploadOneFileAndOtherModelData(formData) {

    return this.http.post(this.baseUrl + 'api/FileUpload/UploadOneFileAndOtherModelData/', formData, this.getHttpOptionsWithoutContentType())
      .pipe(
        catchError(this.handleError)
      );
  }

  UploadMultipleFiles(formData) {

    return this.http.post(this.baseUrl + 'api/FileUpload/UploadMultipleFiles/', formData, this.getHttpOptionsWithoutContentType())
      .pipe(
        catchError(this.handleError)
      );
  }

  /////////////////////////////////////////////////////////
  // END - File Upload
  /////////////////////////////////////////////////////////


  // From PS Course
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books')
      .pipe(
        catchError(this.handleError)
    );
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>('/api/books/${id}', this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  GetSomething(): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(this.baseUrl + 'api/SampleData/WeatherForecasts', this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getLogs(): Observable<Log> {
    return this.http.get<Log>(this.baseUrl + 'api/Logs/GetLogs', this.getHttpOptions())
      .pipe(catchError(this.handleError)
      );
  }

  /////////////////////////////////////////////////////////
  // ERROR HANDLING - New httpClient
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
