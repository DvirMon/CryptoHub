import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {


  constructor(
    private dialogService: DialogService,
    private ngZone: NgZone,
    private router : Router
  ) { 

  } 

  public handleError(error) {


    let spinnerRef;
    
    this.ngZone.run(() => {
      spinnerRef = this.dialogService.openSpinner()
    });
    
    
    
    if (error instanceof HttpErrorResponse) {

      console.error(error);

      if (error.status === 401) {
        return
      }

      if (error.status === 0) {
        this.router.navigateByUrl("welcome")
      }
      
      spinnerRef.close()

      environment.production
        ? this.dialogService.handleErrorDialog(this.dialogService.errorData)
        : this.dialogService.handleErrorDialog(error)
    }
    else {

      spinnerRef.close()

      this.dialogService.handleErrorDialog(this.dialogService.errorData)
      console.error(error);

    }
  }

}
