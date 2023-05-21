import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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

  readonly selectedCoinLength: Signal<number> =this.storeService.getSelectedCoinMapLength()

  public selectedCoinBudge: Signal<string> = computed(() => this.selectedCoinLength() > 0 ? String(this.selectedCoinLength()) : '')


}
