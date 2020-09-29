import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsRoutingModule } from './coins-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CoinsRootComponent } from './components/coins-root/coins-root.component';
 
// NAVIGATION COMPONENTS
import { CoinsBarComponent } from './components/coins-nav/coins-bar/coins-bar.component';
import { CoinsNavComponent } from './components/coins-nav/coins-nav/coins-nav.component';
import { CoinsSelectWebComponent } from './components/coins-nav/coins-select-web/coins-select-web.component';
import { CoinsSelectMobileComponent } from './components/coins-nav/coins-select-mobile/coins-select-mobile.component';

// SEARCH COMPONENTS
import { CoinsSearchComponent } from './components/coins-search/coins-search/coins-search.component';
import { CoinsSearchItemComponent } from './components/coins-search/coins-search-item/coins-search-item.component';

// GRID COMPONENTS
import { CoinsPanelComponent } from './components/coins-grid/coins-panel/coins-panel.component';
import { CoinsListComponent } from './components/coins-grid/coins-list/coins-list.component';
import { CoinsItemComponent } from './components/coins-grid/coins-item/coins-item.component';
import { CoinsDrawerComponent } from './components/coins-grid/coins-drawer/coins-drawer.component';

// HELPER COMPONENTS
import { CoinsDialogComponent } from './components/coins-dialog/coins-dialog.component';
import { CoinsExpendPanelComponent } from './components/coins-card/coins-expend-panel/coins-expend-panel.component';
import { CoinsToggleComponent } from './components/coins-card/coins-toggle/coins-toggle.component';

@NgModule({
  declarations: [ 
    CoinsRootComponent,

    CoinsBarComponent,
    CoinsNavComponent,
    CoinsSelectWebComponent,
    CoinsSelectMobileComponent,

    CoinsSearchComponent,
    CoinsSearchItemComponent,

    CoinsPanelComponent,
    CoinsListComponent,
    CoinsItemComponent,

    CoinsDialogComponent,
    CoinsExpendPanelComponent,
    CoinsToggleComponent,
    CoinsDrawerComponent,


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
