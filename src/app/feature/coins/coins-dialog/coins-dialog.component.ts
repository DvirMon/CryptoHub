import { Component, Inject, Signal, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { StoreService } from 'src/app/ngrx/store.service';

import { isEqual } from "lodash";

@Component({
  selector: 'app-coins-dialog',
  templateUrl: './coins-dialog.component.html',
  styleUrls: ['./coins-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, TypographyComponent, MatButtonModule, MatDividerModule, MatDialogModule, MatSlideToggleModule],
})

export class CoinsDialogComponent {

  private storeService: StoreService = inject(StoreService);

  readonly title: string = 'you can choose up to 5 coins';
  readonly selectedCoinsMap: Signal<{ [key: string]: boolean }> = this.storeService.getSelectedCoinMap();

  private _unselectedCoins: WritableSignal<{ [key: string]: boolean }> = signal({ ...this.selectedCoinsMap() });

  readonly disabledSave: Signal<boolean> = computed(() => isEqual(this._unselectedCoins(), this.selectedCoinsMap()));


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


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
    this.storeService.onDialogSaved(this._unselectedCoins());
  }

}
