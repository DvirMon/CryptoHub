import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsRoutingModule } from './coins-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CoinsRootComponent } from './components/coins-root/coins-root.component';

// NAVIGATION COMPONENTS
import { CoinsBarComponent } from './components/coins-nav/coins-bar/coins-bar.component';
import { CoinsNavComponent } from './components/coins-nav/coins-nav/coins-nav.component';

// SEARCH COMPONENTS
import { CoinsSearchComponent } from './components/coins-search/coins-search/coins-search.component';
import { CoinsMobileSearchComponent } from './components/coins-search/coins-search-mobile/coins-mobile-search.component';
import { CoinsSearchItemComponent } from './components/coins-search/coins-search-item/coins-search-item.component';

// GRID COMPONENTS
import { CoinsPanelComponent } from './components/coins-grid/coins-panel/coins-panel.component';
import { CoinsPanelSearchComponent } from './components/coins-grid/coins-panel-search/coins-panel-search.component';
import { CoinsListComponent } from './components/coins-grid/coins-list/coins-list.component';
import { CoinsItemComponent } from './components/coins-grid/coins-item/coins-item.component';

import { CoinsExpendPanelComponent } from './components/coins-grid/coins-expend-panel/coins-expend-panel.component';
import { CoinsToggleComponent } from './components/coins-grid/coins-toggle/coins-toggle.component';
import { CoinsMenuComponent } from './components/coins-nav/coins-menu/coins-menu.component';


@NgModule({
  declarations: [
    CoinsRootComponent,

    CoinsBarComponent,
    CoinsNavComponent,

    CoinsSearchComponent,
    CoinsSearchItemComponent,
    CoinsMobileSearchComponent,

    CoinsPanelComponent,
    CoinsPanelSearchComponent,
    CoinsListComponent,
    CoinsItemComponent,
    CoinsExpendPanelComponent,
    CoinsToggleComponent,
    CoinsMenuComponent,


  ],
  imports: [
    CommonModule,
    CoinsRoutingModule,
    SharedModule
  ]
})
export class CoinsModule { }
