import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoinsService } from 'src/app/services/coins.service';
import { CoinsDialogData, DialogData } from 'src/app/services/dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coins-dialog',
  templateUrl: './coins-dialog.component.html',
  styleUrls: ['./coins-dialog.component.scss']
})
export class CoinsDialogComponent implements OnInit {

  public development: boolean = environment.production
  public payload : CoinsDialogData

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private coinsService : CoinsService
  ) { 
    this.payload = this.data.payload
  }


  ngOnInit(): void {
  }

  public onClose() {
    this.coinsService.deleteSelectedCoin(this.data.payload.coin)

  }




}
