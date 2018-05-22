import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CurrentUserService } from './current-user.service';
import { ToastrService } from './toastr.service';

@Injectable()
export class DataServiceGenerated {

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
  /////////////////////////////////////////////////////////
  // Start - Auth Stuff
  /////////////////////////////////////////////////////////

  createToken(username: string, password: string): Observable<any> {

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json')

    const myJson = JSON.stringify({ 'username': username, 'password': password })

    return this.http.post(this.baseUrl + 'Auth/CreateToken', myJson, this.httpOptions);
  }

  /////////////////////////////////////////////////////////////////////
  // START ClaimantsController.cs - GENERATED CODE (Do not edit)
  /////////////////////////////////////////////////////////////////////
  ClaimantsGetClaimantsForClaim(claimId: number, pageNumber: number, pageSize: number, fields: string, sort: string, ): Observable<any> {
    return this.http.get(
      this.baseUrl + 'api/Claims/{claimId}/Claimants/' + '?claimId=' + claimId + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&fields=' + fields + '&sort=' + sort, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('GetClaimantsForClaim'))
      );
  }

  ClaimantsGetClaimantByClaimantId(claimId: number, claimantId: number, ): Observable<any> {
    return this.http.get(
      this.baseUrl + 'api/Claims/{claimId}/Claimants/' + '?claimId=' + claimId + '&claimantId=' + claimantId, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('GetClaimantByClaimantId'))
      );
  }

  ClaimantsCreateClaimantForClaim(claimId: number, claimantIn): Observable<any> {
    return this.http.post(
      this.baseUrl + 'api/Claims/{claimId}/Claimants/' + '?claimId=' + claimId + '&claimantIn=' + claimantIn, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('CreateClaimantForClaim'))
      );
  }

  ClaimantsUpdateClaimantForClaim(claimId: number, claimantId: number, claimantIn): Observable<any> {
    return this.http.put(
      this.baseUrl + 'api/Claims/{claimId}/Claimants/' + '?claimId=' + claimId + '&claimantId=' + claimantId + '&claimantIn=' + claimantIn, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('UpdateClaimantForClaim'))
      );
  }

  ClaimantsDeleteClaimant(claimId: number, claimantId: number, ): Observable<any> {
    return this.http.delete(
      this.baseUrl + 'api/Claims/{claimId}/Claimants/' + '?claimId=' + claimId + '&claimantId=' + claimantId, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('DeleteClaimant'))
      );
  }

  /////////////////////////////////////////////////////////////////////
  // END ClaimantsController.cs
  /////////////////////////////////////////////////////////////////////

  // * Handle Http operation that failed.
  // * Let the app continue.
  // * @param operation - name of the operation that failed
  // * @param result - optional value to return as the observable result

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

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
