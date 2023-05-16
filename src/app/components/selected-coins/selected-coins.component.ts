import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CoinModel } from 'src/app/models/coin.model';

@Component({
  selector: 'app-selected-coins',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBadgeModule, MatMenuModule],
  templateUrl: './selected-coins.component.html',
  styleUrls: ['./selected-coins.component.scss']
})
export class SelectedCoinsComponent {

  private selectedCoins: CoinModel[] = []
  public selectedList: CoinModel[] = []

  selectedCoin: WritableSignal<string> = signal(this.setSelectedCoin())

  private setSelectedCoin(): string {
    return this.selectedCoins.length > 0 ? String(this.selectedCoins.length) : ''
  }

}
