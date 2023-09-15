import { Component, Signal, WritableSignal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { LayoutService } from './layout.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { SearchSidenavComponent } from '../search-sidenav/search-sidenav.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    SearchSidenavComponent
  ]
})
export class LayoutComponent {

  private layoutService: LayoutService = inject(LayoutService);

  readonly showToolbar: WritableSignal<boolean> = this.layoutService.getToolbarSignal()
  readonly selectedCoinsAmount: Signal<number> = this.layoutService.getSelectedCoinsAmount()
  readonly selectedCoinBudge: Signal<string> = computed(() => this.selectedCoinsAmount() > 0 ? String(this.selectedCoinsAmount()) : '')

}
