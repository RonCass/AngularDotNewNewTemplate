import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { WeatherForecast, Log, Book, APICrudExample, TokenInfo } from './models';
import { CurrentUserService } from './current-user.service';
import { ToastrService } from './toastr.service';
// import { RequestOptions } from '@angular/http';


@Injectable()
export class DataService {

  public baseUrl = 'http://localhost:49431/'; // 'http://localhost:49223/';
  public httpOptions;
  public httpOptionsWithoutContentType;
  public tokenInfo = new TokenInfo();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private currentUserService: CurrentUserService, private toastrService: ToastrService) {

    this.currentUserService.$tokenInfo.subscribe(tokenInfo => {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenInfo.token
        })
      };

      this.httpOptionsWithoutContentType = {
        headers: new HttpHeaders({
          'Accept': 'application/json',          
          'Authorization': 'Bearer ' + tokenInfo.token
        })
      };

      this.tokenInfo = tokenInfo;
    })

  }

  //getToken() {
  //  const myToken = this.currentUserService.getUserToken();
  //  return myToken;
  //}

  //this.httpOptions {
  //  return {
  //    headers: new HttpHeaders({
  //      'Accept': 'application/json',
  //      'Content-Type': 'application/json',
  //      // 'Authorization': 'Bearer ' + this.getToken()
  //    })
  //  };
  //}

   // Cant submit document saying its JSON data so have to remove that line from the headers
  //getHttpOptionsWithoutContentType() {
  //  return {
  //    headers: new HttpHeaders({
  //      'Accept': 'application/json',
  //      'Authorization': 'Bearer ' + this.getToken()
  //    })
  //  };

  // 'Content-Type': 'multipart/form-data',
  //}
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

    return this.http.post(this.baseUrl + 'api/Auth/CreateToken',
      myJson, this.httpOptions);
  }


  /////////////////////////////////////////////////////////
  // START - APICrudExample
  /////////////////////////////////////////////////////////
  getAPICrudExample(pageNumber: number, pageSize: number, sort: string): Observable<any> {

    return this.http.get(this.baseUrl + 'api/APICrudExample/?pageNumber=' + pageNumber + '&pageSize=' + pageSize +
      '&sort=' + sort, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAPICrudExampleById(apiCrudExampleId: number): Observable<any> {

    return this.http.get(this.baseUrl + 'api/APICrudExample/' + apiCrudExampleId, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createAPICrudExample(apiCrudExample: APICrudExample) {

    const myJson = JSON.stringify(apiCrudExample);
    return this.http.post(this.baseUrl + 'api/APICrudExample/', myJson, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAPICrudExample(apiCrudExample: APICrudExample) {

    const myJson = JSON.stringify(apiCrudExample);
    return this.http.put(this.baseUrl + 'api/APICrudExample/' + apiCrudExample.id, myJson, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAPICrudExample(apiCrudExample: APICrudExample) {

    return this.http.delete(this.baseUrl + 'api/APICrudExample/' + apiCrudExample.id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /////////////////////////////////////////////////////////
  // END - APICrudExample
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  // START - Logging Demo
  /////////////////////////////////////////////////////////

  getLoggingLevel(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Logs/GetLoggingLevel/', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  changeLoggingLevel(logEventLevel): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Logs/ChangeLoggingLevel/?logEventLevel=' + logEventLevel, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLogs(pageNumber = 1, pageSize = 20, sort = '', fields = '', userId = '', level = ''): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Logs/GetLogs/?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort + '&fields=' + fields + '&userId=' + userId + '&level=' + level, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  //getLogs(): Observable<Log> {
  //  return this.http.get<Log>(this.baseUrl + 'api/Logs/GetLogs', this.httpOptions)
  //    .pipe(catchError(this.handleError)
  //    );
  //}

  getLogFileList(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Logs/GetLogFileList', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLogFile(myFile): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Logs/GetLogFile/?myFile=' + myFile, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

 

  

  /////////////////////////////////////////////////////////
  // End - Logging Demo
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  // START - File Upload
  /////////////////////////////////////////////////////////

  UploadOneFileOnly(formData) {

    return this.http.post(this.baseUrl + 'api/FileUpload/UploadOneFileOnly/', formData, this.httpOptionsWithoutContentType)
      .pipe(
        catchError(this.handleError)
      );
  }
  UploadOneFileAndOtherModelData(formData) {

    return this.http.post(this.baseUrl + 'api/FileUpload/UploadOneFileAndOtherModelData/',
      formData, this.httpOptionsWithoutContentType)
      .pipe(
        catchError(this.handleError)
      );
  }

  UploadMultipleFiles(formData) {

    return this.http.post(this.baseUrl + 'api/FileUpload/UploadMultipleFiles/', formData, this.httpOptionsWithoutContentType)
      .pipe(
        catchError(this.handleError)
      );
  }

  /////////////////////////////////////////////////////////
  // END - File Upload
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  // START - Dummy Data
  /////////////////////////////////////////////////////////
  getDummyData(pageNumber: number, pageSize: number, sort: string): Observable<any> {

    return this.http.get(this.baseUrl + 'api/DummyData/?pageNumber=' + pageNumber + '&pageSize=' + pageSize +
     '&sort=' + sort, this.httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  getDummyDataBySearchText(pageNumber: number, pageSize: number, sort: string, searchText: string): Observable<any> {

    return this.http.get(this.baseUrl + 'api/DummyData/GetByText/?pageNumber=' + pageNumber + '&pageSize=' + pageSize +
     '&sort=' + sort + '&searchText=' + searchText, this.httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  /////////////////////////////////////////////////////////
  // END - Dummy Data
  /////////////////////////////////////////////////////////


  // From PS Course
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books')
      .pipe(
        catchError(this.handleError)
    );
  }

  //getBookById(id: number): Observable<Book> {
  //  return this.http.get<Book>('/api/books/${id}', this.httpOptions)
  //    .pipe(
  //      catchError(this.handleError)
  //    );
  //}

  //GetSomething(): Observable<WeatherForecast> {
  //  return this.http.get<WeatherForecast>(this.baseUrl + 'api/SampleData/WeatherForecasts', this.httpOptions)
  //    .pipe(
  //      catchError(this.handleError)
  //    );
  //}

 

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
