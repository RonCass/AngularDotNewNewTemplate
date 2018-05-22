//import { Injectable } from '@angular/core';
//import { HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpRequest, HttpInterceptor } from '@angular/common/http';
//import { Observable } from 'rxjs';

//@Injectable()
//export class AddHeaderInteceptor implements HttpInterceptor {
//  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

//    console.log("AddHeader Interceptor - ");

//    let jsonReq: HttpRequest<any> = req.clone({
//      setHeaders: {
//        'Content-Type': 'application/json',
//        'Accept': 'application/json'
//      }
//    });
    

//    //Change modifiedRequest here

//    return next.handle(jsonReq);
//  }

//  constructor() { }

//}
