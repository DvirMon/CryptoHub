import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { FormService } from './form.service';

import { DialogComponent } from '../dialog/components/dialog/dialog.component';
import { CoinsDialogComponent } from '../dialog/components/dialog-coins/coins-dialog.component';


export interface DialogData {
  type: string
  payload: any
}

export interface CoinsDialogData {
  coins: string[],
  lastSelect: string
}

export interface ErrorDialogData {
  error?: string,
  message: string,
  status: any
}
 
@Injectable({
  providedIn: 'root',
})


export class DialogService {

  public errorData: ErrorDialogData = {
    message: "An error has occurred please try again later",
    status: null
  }

  constructor(
    private dialog: MatDialog,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS) private dialogConfig: MatDialogConfig
  ) { }

 
  // open spinner dialog
  public openSpinner(): MatDialogRef<DialogComponent> {
    const data = this.handleDate("spinner")
    console.log(1)
    return this.dialog.open(DialogComponent, this.handleConfig(data));
  }

  // open error dialog 
  public handleErrorDialog(error: HttpErrorResponse | ErrorDialogData) {
    const payload = this.handleErrorDialogData(error)
    const data = this.handleDate("error", payload)
    this.dialog.open(DialogComponent, this.handleConfig(data))
  }

  public handleCoinsDialog(payload: CoinsDialogData): MatDialogRef<CoinsDialogComponent> {
    const data = this.handleDate('coins', payload)
    return this.dialog.open(CoinsDialogComponent, this.handleConfig(data));
  }


  // handle dialog data
  private handleDate(type: string, payload?: any): DialogData {
    const data = { ...this.data }
    data.type = type
    data.payload = payload
    return data
  }

  // handle dialog configuration
  private handleConfig(data: DialogData): MatDialogConfig {

    const dialogConfig = { ...this.dialogConfig }

    switch (data.type) {
      case "error":
        dialogConfig.disableClose = true;
        dialogConfig.data = data
        dialogConfig.panelClass = "dialog-error"
        break

      case "spinner":
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.data = data;
        dialogConfig.panelClass = "dialog-spinner"
        break
      case "coins":
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.data = data;
        dialogConfig.panelClass = "dialog-coins"
        break
    }

    return dialogConfig
  }


  private handleErrorDialogData(error: HttpErrorResponse | ErrorDialogData): ErrorDialogData {

    let message = ''

    switch (error.status) {
      case 0:
        message = "You are not connected to database"
        break
      case 500:
        message = this.errorData.message
        break
      case 409:
        message = error.error
        break
      default:
        message = error?.error ? error.error : this.errorData.message
    }
    return { message, status : error.status }
  }

}