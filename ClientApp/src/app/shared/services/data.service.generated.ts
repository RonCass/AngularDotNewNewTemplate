import { Injectable, Inject  } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CurrentUserService } from './current-user.service';
import { ToastrService } from './toastr.service';

import { ApplicationUserIn, } from '../models/models.generated';


 export class TokenInfo {
 expiration: string;
 token: string;
 }

@Injectable()
export class DataServiceGenerated {

public baseUrl = environment.apiUrl;
public httpOptions;
public httpOptionsWithoutContentType;
public tokenInfo = new TokenInfo();

constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
  private currentUserService: CurrentUserService, private toastrService: ToastrService
) { 

this.currentUserService.$tokenInfo.subscribe(tokenInfo => {
 if (tokenInfo == null) {
   tokenInfo = new TokenInfo();
  }

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

/////////////////////////////////////////////////////////
// Start - Auth Stuff
/////////////////////////////////////////////////////////

createToken(username: string, password: string): Observable < any > {

const headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

const myJson = JSON.stringify({ 'username': username, 'password': password });

return this.http.post(this.baseUrl + 'Auth/CreateToken', myJson, this.httpOptions);
}

/////////////////////////////////////////////////////////////////////
// START ApplicationUsersController - GENERATED CODE (Do not edit)
/////////////////////////////////////////////////////////////////////
ApplicationUsersSetApplicationUserIsActive(ApplicationUserid: number, IsActive: boolean, ): Observable<any> {
return this.http.get(
this.baseUrl + '/ApplicationUsers/SetApplicationUserIsActive/' + '?ApplicationUserid=' + ApplicationUserid + '&IsActive=' + IsActive, this.httpOptions)
 .pipe(
catchError(this.handleError<any>('SetApplicationUserIsActive'))
 );
 }

ApplicationUsersSetApplicationUserEmailConfirmed(ApplicationUserid: number, EmailConfirmed: boolean, ): Observable<any> {
return this.http.get(
this.baseUrl + '/ApplicationUsers/SetApplicationUserEmailConfirmed/' + '?ApplicationUserid=' + ApplicationUserid + '&EmailConfirmed=' + EmailConfirmed, this.httpOptions)
 .pipe(
catchError(this.handleError<any>('SetApplicationUserEmailConfirmed'))
 );
 }

ApplicationUsersGetPagedList(pageNumber: number, pageSize: number, sort: string, filterColumnName: string, filterValue: string, ): Observable<any> {
return this.http.get(
this.baseUrl + '/ApplicationUsers/GetPagedList/' + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sort=' + sort + '&filterColumnName=' + filterColumnName + '&filterValue=' + filterValue, this.httpOptions)
 .pipe(
catchError(this.handleError<any>('GetPagedList'))
 );
 }

ApplicationUsersGet(page: number, pageSize: number, sort: string, isActive: boolean, userName: string, fields: string, ): Observable<any> {
return this.http.get(
this.baseUrl + '/ApplicationUsers/' + '?page=' + page + '&pageSize=' + pageSize + '&sort=' + sort + '&isActive=' + isActive + '&userName=' + userName + '&fields=' + fields, this.httpOptions)
 .pipe(
catchError(this.handleError<any>('Get'))
 );
 }

ApplicationUsersGetById(id: number, ): Observable<any> {
return this.http.get(
this.baseUrl + '/ApplicationUsers/GetById/' + '?id=' + id, this.httpOptions)
 .pipe(
catchError(this.handleError<any>('GetById'))
 );
 }

ApplicationUsersGetRoles(): Observable<any> {
return this.http.get(
this.baseUrl + '/ApplicationUsers/GetRoles/', this.httpOptions)
 .pipe(
catchError(this.handleError<any>('GetRoles'))
 );
 }

ApplicationUsersPostUsers(applicationUserIn: ApplicationUserIn, ): Observable<any> {
return this.http.post(
this.baseUrl + '/ApplicationUsers/' + '?applicationUserIn=' + applicationUserIn, this.httpOptions)
 .pipe(
catchError(this.handleError<any>('PostUsers'))
 );
 }

/////////////////////////////////////////////////////////////////////
// END ApplicationUsersController
/////////////////////////////////////////////////////////////////////



// * Handle Http operation that failed.
// * Let the app continue.
// * @param operation - name of the operation that failed
// * @param result - optional value to return as the observable result

private handleError<T> (operation = 'operation', result?: T) {
return (error: any): Observable < T > => {

// TODO: send the error to remote logging infrastructure
console.error(error); // log to console instead

// TODO: better job of transforming error for user consumption
// this.log(`${ operation} failed: ${ error.message}`);

// Let the app keep running by returning an empty result.
return of(result as T);
 };
}
// TODO: Need to create this MessageService to log issues back to DB
/** Log a HeroService message with the MessageService */
// private log(message: string) {
//    this.messageService.add('HeroService: ' + message);
// }

}
