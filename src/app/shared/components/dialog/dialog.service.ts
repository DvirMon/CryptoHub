import { ComponentType } from '@angular/cdk/portal';
import { Injectable, Inject, } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';


// export interface DialogData {
//   type: string
//   payload: any
//   spinner$: Observable<boolean>
//   msg$: Observable<string>
// }

@Injectable({
  providedIn: 'root',
})


export class DialogService {

  private spinnerSource: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private messageSource: BehaviorSubject<string> = new BehaviorSubject('sending resume...');


  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS) private dialogConfig: MatDialogConfig
  ) { }

  // open spinner dialog
  public openDialog(component: ComponentType<unknown>, data: unknown) {
    console.group('works')
    // return this.dialog.open(component, this.handleConfig(data));
  }

  // public afterClose(): Observable<void> {
  //   return this.dialog.afterAllClosed
  // }

  // public listenToSpinner(): Observable<boolean> {
  //   return this.spinnerSource.asObservable();
  // }

  // public closeSpinner(): void {
  //   this.spinnerSource.next(false)
  // }

  // public listenToMessage(): Observable<string> {
  //   return this.messageSource.asObservable();
  // }

  // public emitMessage(msg: string): void {
  //   this.messageSource.next(msg)
  // }


  // handle dialog configuration
  private handleConfig(data? : unknown): MatDialogConfig {

    const dialogConfig = { ...this.dialogConfig }

    dialogConfig.data = data;
    // dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = "dialog"

    return dialogConfig
  }

}
