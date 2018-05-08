
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CurrentUserService } from './current-user.service';




// Got this code at https://gist.github.com/jonesmac/6bb692042b9e078dd63ad270591a01cd
// Trying to handle a 401 unauthorized. Need to clear tokens and redirect to login page 6/2/2017 Ron C.

@Injectable()
export class ExtendedHttpService extends Http {

    // constructor(backend: XHRBackend, defaultOptions: RequestOptions, private router: Router,
    //      private currentUserService: CurrentUserService) {
    //     super(backend, defaultOptions);
    // }

    // request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    //     // do whatever
    //     if (typeof url === 'string') {
    //         if (!options) {
    //             options = { headers: new Headers() };
    //         }
    //         this.setHeaders(options);
    //     } else {
    //         this.setHeaders(url);
    //     }

    //     return super.request(url, options)
    //     .pipe(
    //         catchError(this.catchErrors)
    //       );
    //     // .catch(this.catchErrors());
    // }

    // private catchErrors() {
    //     return (res: Response) => {
    //         if (res.status === 401 || res.status === 403) {

    //             this.currentUserService.deleteUserToken();
    //             this.currentUserService.deleteApplicationUser();
    //             this.router.navigate(['/login']);

    //             return Observable.of(res);
    //         } else {
    //             return observableThrowError(res);
    //         }
    //     };
    // }

    private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
        // add whatever header that you need to every request
        // in this example I add header token by using authService that I've created
        // objectToSetHeadersTo.headers.set('Token', this.getToken());

        // All Headers are being set in teh Data Service - Ron C.
    }

    // getToken() {
    //    var myToken = this.currentUserService.getUserToken();
    //    return myToken// === null ? myToken : null;
    // }

    // getHeaders() {
    //    let headers = new Headers();
    //    headers.append('Accept', 'application/json');
    //    headers.append('Content-Type', 'application/json')
    //    //headers.append('Authorization', 'Bearer ' + this.getToken())
    //    return new RequestOptions({ headers: headers });
    // }
}
