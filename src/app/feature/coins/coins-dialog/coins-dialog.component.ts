import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';

import { isEqual } from "lodash";
import { CoinStore } from '../store/coins.store.';
import { COINS_SELECT_LIMIT } from 'src/app/shared/constants';

@Component({
  selector: 'app-coins-dialog',
  templateUrl: './coins-dialog.component.html',
  styleUrls: ['./coins-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, TypographyComponent, MatButtonModule, MatDividerModule, MatDialogModule, MatSlideToggleModule],
})

export class CoinsDialogComponent {

  private coinStore: CoinStore = inject(CoinStore);

  readonly title: string = `you can choose up to ${COINS_SELECT_LIMIT} coins`;
  readonly selectedCoinsMap: Signal<Record<string, boolean>> = this.coinStore.getSelectedCoinMap();

  private _unselectedCoins: WritableSignal<Record<string, boolean>> = signal({ ...this.selectedCoinsMap() });

  readonly disabledSave: Signal<boolean> = computed(() => isEqual(this._unselectedCoins(), this.selectedCoinsMap()));


  public onToggleChanged(event: MatSlideToggleChange): void {
    const { source, checked } = event
    const { name } = source

    const key = String(name)

    if (checked) {
      this._unselectedCoins.set({
        ...this._unselectedCoins(),
        [key]: checked
      })
    }

    else {
      this._unselectedCoins.mutate((value) => {
        delete value[key]
      })
    }
  }

  public onSaveDialog(): void {
    this.coinStore.onDialogSaved(this._unselectedCoins());
  }

}
