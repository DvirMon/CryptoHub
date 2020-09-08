import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsRoutingModule } from './coins-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CoinsRootComponent } from './components/coins-root/coins-root.component';
import { CoinsBarComponent } from './components/coins-bar/coins-bar.component';
import { CoinsListComponent } from './components/coins-list/coins-list.component';
import { CoinsItemComponent } from './components/coins-item/coins-item.component';
import { CoinsExpendPanelComponent } from './components/coins-expend-panel/coins-expend-panel.component';
import { CoinsSearchComponent } from './components/coins-search/coins-search.component';
import { CoinsToggleComponent } from './components/coins-toggle/coins-toggle.component';
import { CoinsDialogComponent } from './components/coins-dialog/coins-dialog.component';
import { CoinsNavSearchComponent } from './components/coins-nav-search/coins-nav-search.component';
import { CoinsSearchItemComponent } from './components/coins-search-item/coins-search-item.component';
import { CoinsItemSkeltonComponent } from './components/coins-item-skelton/coins-item-skelton.component';
 

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
    CoinsNavSearchComponent,
    CoinsSearchItemComponent,
    CoinsItemSkeltonComponent,
    

  ],
  imports: [
    CommonModule,
    CoinsRoutingModule,
    SharedModule
  ]
})
export class CoinsModule { }
