import { Injectable } from '@angular/core';
import { HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpRequest, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    console.log('LogResponseInterceptor - ${req.url}');

    return next.handle(req)
      .pipe(
        tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log(event.body)
        }
        })
      );
  }

  

}
