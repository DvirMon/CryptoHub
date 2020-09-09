import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/services/dialog.service';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
 
})
export class DialogComponent { 

  public development : boolean = environment.production

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }


} 
