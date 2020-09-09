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


@NgModule({
  declarations: [
    CoinsRootComponent,

    CoinsBarComponent,
    CoinsNavComponent,
    CoinsSearchComponent,
    CoinsMobileSearchComponent,

    CoinsListComponent,
    CoinsItemComponent,
    CoinsItemSkeltonComponent,
    CoinsExpendPanelComponent,
    CoinsToggleComponent,
    CoinsSearchItemComponent,
    

  ],
  imports: [
    CommonModule,
    CoinsRoutingModule,
    SharedModule
  ]
})
export class CoinsModule { }
