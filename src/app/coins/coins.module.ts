import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsRoutingModule } from './coins-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CoinsRootComponent } from './components/coins-root/coins-root.component';
 
// NAVIGATION COMPONENTS
import { CoinsBarComponent } from './components/coins-nav/coins-bar/coins-bar.component';
import { CoinsNavComponent } from './components/coins-nav/coins-nav/coins-nav.component';
import { CoinsDrawerComponent } from './components/coins-nav/coins-drawer/coins-drawer.component';

// DASHBOARD COMPONENTS
import { CoinsPanelComponent } from './components/coins-grid/coins-dashboard/coins-panel.component';
import { CoinsListComponent } from './components/coins-grid/coins-list/coins-list.component';
import { CoinsItemComponent } from './components/coins-grid/coins-item/coins-item.component';

// SEARCH COMPONENTS
import { CoinsSearchComponent } from './components/coins-search/coins-search/coins-search.component';
import { CoinsSearchItemComponent } from './components/coins-search/coins-search-item/coins-search-item.component';

// HELPER COMPONENTS
import { CoinsDialogComponent } from './components/coins-dialog/coins-dialog.component';
import { CoinsExpendPanelComponent } from './components/coins-card/coins-expend-panel/coins-expend-panel.component';
import { CoinsToggleComponent } from './components/coins-card/coins-toggle/coins-toggle.component';
import { CoinsToggleListComponent } from './components/coins-card/coins-toggle-list/coins-toggle-list.component';

@NgModule({
  declarations: [ 
    CoinsRootComponent,

    CoinsBarComponent,
    CoinsNavComponent,

    CoinsSearchComponent,
    CoinsSearchItemComponent,

    CoinsPanelComponent,
    CoinsListComponent,
    CoinsItemComponent,

    CoinsDialogComponent,
    CoinsExpendPanelComponent,
    CoinsToggleComponent,
    CoinsDrawerComponent,
    CoinsToggleListComponent,


  ],
  imports: [
    CommonModule,
    CoinsRoutingModule,
    SharedModule,
  ]
  , exports: [
    CoinsDialogComponent
  ]
})
export class CoinsModule { }
