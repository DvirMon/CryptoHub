import { Injectable, NgZone } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { DialogService } from 'src/app/services/dialog.service';

import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/services/loader.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})


export class SpinnerInterceptorService implements HttpInterceptor {


  private url = {
    search: "https://api.coingecko.com/api/v3/coins/list",
    pagination: `${environment.server}/api/coins`,
    currency: "https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=ils%2Cusd%2Ceur"
  }

 
  constructor(
    private dialogService: DialogService,
    private loaderService: LoaderService,
    private ngZone: NgZone,
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url === this.url.pagination || request.url === this.url.search) {

      this.loaderService.loader.next(true)
      console.log(1)
      return next.handle(request)
    }

    let spinnerRef: MatDialogRef<DialogComponent, any>

    this.ngZone.run(() => {
      spinnerRef = this.dialogService.openSpinner()
    });


    const modified = request.clone({});

    return this.handleSpinnerInterceptor(next, modified, spinnerRef)
  }


  private handleSpinnerInterceptor(next: HttpHandler, clone: HttpRequest<any>, spinnerRef?: MatDialogRef<DialogComponent, any>) {
    return next.handle(clone).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            spinnerRef.close()
            this.loaderService.loader.next(false)
          }
        }),
      catchError((error: HttpErrorResponse) => {
        spinnerRef.close()
        this.loaderService.loader.next(false)
        return throwError(error);
      }))
  }


}
