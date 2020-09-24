import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CoinsService } from 'src/app/services/coins.service';
import { CoinModel } from 'src/app/utilities/models/coin.model';
import { CoinsDialogComponent } from '../../coins-dialog/coins-dialog.component';

@Component({
  selector: 'app-coins-toggle',
  templateUrl: './coins-toggle.component.html',
  styleUrls: ['./coins-toggle.component.scss']
})
export class CoinsToggleComponent implements OnInit {

  @Input() dialog: boolean
  @Input() coins: CoinModel[]
  @Input() lastSelect: CoinModel
  @Input() dialogRef: MatDialogRef<CoinsDialogComponent>

  constructor(
    private coinsService: CoinsService,
    

  ) { }

  ngOnInit(): void {
  }

  public handleToggle(coin: CoinModel) {

    this.coinsService.deleteSelectedCoin(coin.id)

    if (this.dialog) {
      this.dialogRef.close()
      this.coinsService.addSelectedCoin(this.lastSelect)
      this.coinsService.toggleData.next({ coin, lastSelect: this.lastSelect })
    }

    else {
      this.coinsService.toggleData.next({ coin })
    }


  }


}
