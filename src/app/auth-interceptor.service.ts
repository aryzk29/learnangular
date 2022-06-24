import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({headers: req.headers.append('Auth', 'xyz')})
    return next.handle(modifiedReq).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(event.body)
      }
    }));
  }
}
