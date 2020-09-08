import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsRoutingModule } from './coins-routing.module';
import { SharedModule } from '../shared/shared.module';


import { CoinsRootComponent } from './components/coins-root/coins-root.component';

// NAVIGATION COMPONENTS
import { CoinsBarComponent } from './components/coins-nav/coins-bar/coins-bar.component';
import { CoinsNavComponent } from './components/coins-nav/coins-nav/coins-nav.component';
import { CoinsSearchComponent } from './components/coins-nav/coins-search/coins-search.component';
import { CoinsMobileSearchComponent } from './components/coins-nav/coins-search-mobile/coins-mobile-search.component';
import { CoinsSearchItemComponent } from './components/coins-nav/coins-search-item/coins-search-item.component';

// CARD COMPONENTS
import { CoinsListComponent } from './components/coins-card/coins-list/coins-list.component';
import { CoinsItemComponent } from './components/coins-card/coins-item/coins-item.component';
import { CoinsItemSkeltonComponent } from './components/coins-card/coins-item-skelton/coins-item-skelton.component';
import { CoinsToggleComponent } from './components/coins-card/coins-toggle/coins-toggle.component';
import { CoinsExpendPanelComponent } from './components/coins-card/coins-expend-panel/coins-expend-panel.component';

import { CoinsDialogComponent } from './components/coins-dialog/coins-dialog.component';
@NgModule({
  declarations: [
    CoinsRootComponent,
    CoinsBarComponent,
    CoinsListComponent,
    CoinsItemComponent,
    CoinsDialogComponent,
    CoinsExpendPanelComponent,
    CoinsSearchComponent,
    CoinsToggleComponent,
    CoinsMobileSearchComponent,
    CoinsSearchItemComponent,
    CoinsItemSkeltonComponent,
    CoinsNavComponent,
    

  ],
  imports: [
    CommonModule,
    CoinsRoutingModule,
    SharedModule
  ]
})
export class CoinsModule { }
