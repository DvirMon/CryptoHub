import { CommonModule } from "@angular/common";
import {
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { TypographyComponent } from "src/app/shared/components/typography/typography.component";

import { MatDividerModule } from "@angular/material/divider";
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from "@angular/material/slide-toggle";
import { COINS_SELECT_LIMIT } from "src/app/shared/constants";
import { isEqual } from "src/app/shared/helpers";
import { CoinStore } from "../store/coins.store.";

@Component({
  selector: "app-coins-dialog",
  templateUrl: "./coins-dialog.component.html",
  styleUrls: ["./coins-dialog.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    TypographyComponent,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatSlideToggleModule,
  ],
})
export class CoinsDialogComponent {
  private coinStore: CoinStore = inject(CoinStore);

  readonly title: string = `you can choose up to ${COINS_SELECT_LIMIT} coins`;
  readonly selectedCoinsMap: Signal<Record<string, boolean>> =
    this.coinStore.getSelectedCoinMap();

  private _unselectedCoins: WritableSignal<Record<string, boolean>> = signal({
    ...this.selectedCoinsMap(),
  });

  readonly disabledSave: Signal<boolean> = computed(() =>
    isEqual(this._unselectedCoins(), this.selectedCoinsMap())
  );

  private _onCheckedTrue(key: string, checked: boolean): void {
    this._unselectedCoins.set({
      ...this._unselectedCoins(),
      [key]: checked,
    });
  }

  private _onCheckedFalse(key: string): void {
    const value: Record<string, boolean> = this._unselectedCoins();

    delete value[key];

    this._unselectedCoins.set({
      ...value,
    });
  }

  public onToggleChanged(event: MatSlideToggleChange): void {
    const { source, checked } = event;
    const { name } = source;

    checked
      ? this._onCheckedTrue(name as string, checked)
      : this._onCheckedFalse(name as string);
  }

  public onSaveDialog(): void {
    this.coinStore.onDialogSaved(this._unselectedCoins());
  }
}
