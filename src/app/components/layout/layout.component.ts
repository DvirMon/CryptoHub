import { Component, Signal, WritableSignal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { LayoutService } from './layout.service';
import { SelectedCoinsComponent } from '../selected-coins/selected-coins.component';
import { MatBadgeModule } from '@angular/material/badge';
import { StoreService } from 'src/app/ngrx/store.service';
import { MatMenuModule } from '@angular/material/menu';

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
    MatMenuModule
  ]
})
export class LayoutComponent {

  private layoutService: LayoutService = inject(LayoutService);
  showToolbar: WritableSignal<boolean> = this.layoutService.getToolbarSignal()

  private storeService: StoreService = inject(StoreService);

  readonly selectedCoinsAmount: Signal<number> =this.storeService.getSelectedCoinsAmount()

  public selectedCoinBudge: Signal<string> = computed(() => this.selectedCoinsAmount() > 0 ? String(this.selectedCoinsAmount()) : '')

}
