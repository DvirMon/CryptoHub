import { Component, Inject, OnInit, Signal, computed, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { StoreService } from 'src/app/ngrx/store.service';
import { Coin } from 'src/app/models/coin.model';

@Component({
  selector: 'app-coins-dialog',
  templateUrl: './coins-dialog.component.html',
  styleUrls: ['./coins-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, TypographyComponent, MatButtonModule, MatDividerModule, MatDialogModule, MatSlideToggleModule]

})
export class CoinsDialogComponent {

  private storeService: StoreService = inject(StoreService);

  private _unselectedCoins!: { [key: string]: boolean };

  readonly title: string = 'You can choose up to 5 coins'
  readonly selectedCoinsMap: Signal<{ [key: string]: boolean }> = this.storeService.getSelectedCoinMap()
  // readonly selectedCoins: Signal<Array<string>> = this.data.selectedCoins
  // readonly lastSelect: Signal<string> = computed(() => this.selectedCoins()[this.selectedCoins().length - 1])

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  public onToggleChanged(event: MatSlideToggleChange) {
    const { source, checked } = event
    const { name } = source

    const key = String(name)

    if (checked) {
      delete this._unselectedCoins[key]
    }

    else {
      this._unselectedCoins = {
        ...this._unselectedCoins,
        [key]: checked
      }
    }

    // this._storeService.setSelectedMap(checked, { id: name } as Coin)
    // this.coinsService.deleteSelectedCoin(coin.id)
    // this.coinsService.addSelectedCoin(this.payload.lastSelect)
    // this.toggleService.toggleData.next({ coin, lastSelect: this.payload.lastSelect })
  }

  public onCloseDialog() {

    console.log(this._unselectedCoins)
    // this.toggleService.toggleState.next([this.payload.lastSelect])

  }




}
