import { Component, Input, OnDestroy, OnInit } from '@angular/core';

// IMPORT MATERIEL
import { MatDialogRef } from '@angular/material/dialog';

// IMPORT SERVICES
import { CoinsService } from 'src/app/services/coins.service';

// IMPORT MODELS
import { CoinModel } from 'src/app/utilities/models/coin.model';

// IMPORT COMPONENTS
import { CoinsDialogComponent } from '../../coins-dialog/coins-dialog.component';
import { ChartService } from 'src/app/services/chart.service';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-coins-toggle',
  templateUrl: './coins-toggle.component.html',
  styleUrls: ['./coins-toggle.component.scss'],

})
export class CoinsToggleComponent implements OnInit, OnDestroy {


  @Input() dialog: boolean
  @Input() checked: boolean
  @Input() coin: CoinModel
  @Input() lastSelect: CoinModel
  @Input() dialogRef: MatDialogRef<CoinsDialogComponent>

  constructor(
    private coinsService: CoinsService,
    private chartService: ChartService,
    private toggleService: ToggleService,
  ) { }


  ngOnInit(): void {
    this.checked = true
  }

  ngOnDestroy(): void {
    this.coin = null
  }

  public handleToggle(coin: CoinModel) {

    // dialog true - when reach max coins

    if (this.dialog) {

      // updated new selected coin
      this.coinsService.addSelectedCoin(this.lastSelect)
      this.toggleService.toggleData.next({ coin, lastSelect: this.lastSelect })

      setTimeout(() => {
        this.dialogRef.close()
      }, 500)
    }

    else {
      this.toggleService.toggleData.next({ coin, lastSelect: null })
    }

    setTimeout(() => {
      this.coinsService.deleteSelectedCoin(coin.id)
      this.chartService.deleteCoin.next(coin)
    }, 500)

  }




}
