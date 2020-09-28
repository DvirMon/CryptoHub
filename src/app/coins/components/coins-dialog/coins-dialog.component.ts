import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoinsService } from 'src/app/services/coins.service';
import { CoinsDialogData, DialogData } from 'src/app/services/dialog.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coins-dialog',
  templateUrl: './coins-dialog.component.html',
  styleUrls: ['./coins-dialog.component.scss']
})
export class CoinsDialogComponent implements OnInit {

  public development: boolean = environment.production
  public payload: CoinsDialogData

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<CoinsDialogComponent>,
    private coinsService: CoinsService,
    private toggleService: ToggleService

  ) {
    this.payload = this.data.payload
  }


  ngOnInit(): void {
  }

  public onClose() {
    this.toggleService.toggleState.next([this.payload.lastSelect])

  }

  public handleToggle(coin: CoinModel) {
    this.coinsService.deleteSelectedCoin(coin.id)
    this.coinsService.addSelectedCoin(this.payload.lastSelect)
    this.toggleService.toggleData.next({ coin, lastSelect: this.payload.lastSelect })

  }




}
