import { Injectable, NgZone } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { DialogService } from 'src/app/services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {


  constructor(
    private dialogService: DialogService,
    private ngZone: NgZone,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let spinnerRef;

    this.ngZone.run(() => {
      spinnerRef = this.dialogService.openSpinner()
    });


    const modified = request.clone({});

    return this.handleSpinnerInterceptor(next, spinnerRef, modified)
  }


  private handleSpinnerInterceptor(next, spinnerRef, clone) {
    return next.handle(clone).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            spinnerRef.close() 
          }
        }),
      catchError((error: HttpErrorResponse) => {
        spinnerRef.close()
        return throwError(error);
      }))
  }


}
