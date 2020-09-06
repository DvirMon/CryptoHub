import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { DialogService } from 'src/app/services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {



  constructor(
    private dialogService: DialogService,
    private ngZone: NgZone,
  ) {

  }

  public handleError(error) {


    let spinnerRef;

    this.ngZone.run(() => {
      spinnerRef = this.dialogService.openSpinner()
    });



    if (error instanceof HttpErrorResponse) {

      if (error.status == 401) {
        return
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
