import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './components/dialog/dialog.component';
import { CoinsDialogComponent } from './components/dialog-coins/coins-dialog.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    DialogComponent,
    CoinsDialogComponent
  ],
  imports: [ 
    CommonModule,
    MaterialModule
  ],
  exports: [
    DialogComponent,
    CoinsDialogComponent
  ]
})
export class DialogModule { }
