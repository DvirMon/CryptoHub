import { Injectable, NgZone } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { DialogService } from 'src/app/services/dialog.service';

import { LoaderService } from 'src/app/services/loader.service';

import { DialogComponent } from 'src/app/dialog/components/dialog/dialog.component';


import { environment } from 'src/environments/environment';
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

    console.log(request.reportProgress)
    
    if (request.reportProgress) { 
      this.loaderService.loader.next({ loader: false, progress: 0 })
      return this.handleProgressInterceptor(next, request)
    }


    let spinnerRef: MatDialogRef<DialogComponent, any>

    this.ngZone.run(() => {
      spinnerRef = this.dialogService.openSpinner()
    });


    return this.handleSpinnerInterceptor(next, request, spinnerRef)
  }


  private handleSpinnerInterceptor(
    next: HttpHandler,
    request: HttpRequest<any>,
    spinnerRef?: MatDialogRef<DialogComponent, any>): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
           if (event.type === HttpEventType.Response) {
            spinnerRef.close()
          }
        }),
      catchError((error: HttpErrorResponse) => {
        spinnerRef.close()
        return throwError(error);
      }))
  }

  handleProgressInterceptor(next: HttpHandler, request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.DownloadProgress) {
            const progress = Math.round(event.loaded / event.total * 100)
            this.loaderService.loader.next({ loader: true, progress })
          }
          else if (event.type === HttpEventType.Response) {
            this.loaderService.loader.next({ loader: false, progress: 100 })
          }
        }, error => {
        })
      );
  }
}
