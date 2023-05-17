import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Coin } from 'src/app/models/coin.model';
import { StoreService } from 'src/app/ngrx/store.service';

@Component({
  selector: 'app-selected-coins',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBadgeModule, MatMenuModule],
  templateUrl: './selected-coins.component.html',
  styleUrls: ['./selected-coins.component.scss']
})
export class SelectedCoinsComponent {

  private storeService: StoreService = inject(StoreService);

  readonly selectedCoins: Coin[] = []

  selectedCoin: WritableSignal<string> = signal(this.setSelectedCoin())

  private setSelectedCoin(): string {
    return this.selectedCoins.length > 0 ? String(this.selectedCoins.length) : ''
  }

}
