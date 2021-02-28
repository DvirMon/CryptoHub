import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsRoutingModule } from './coins-routing.module';
import { SharedModule } from '../shared/shared.module';

// DASHBOARD COMPONENTS
import { CoinsRootComponent } from './components/coins-grid/coins-root/coins-root.component';
import { CoinsListComponent } from './components/coins-grid/coins-list/coins-list.component';
import { CoinsItemComponent } from './components/coins-grid/coins-item/coins-item.component';

// NAVIGATION COMPONENTS
import { CoinsBarComponent } from './components/coins-nav/coins-bar/coins-bar.component';
import { CoinsDrawerComponent } from './components/coins-nav/coins-drawer/coins-drawer.component';

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
    CoinsListComponent,
    CoinsItemComponent,

    CoinsBarComponent,
    CoinsDrawerComponent,

    CoinsSearchComponent,
    CoinsSearchItemComponent,

    CoinsDialogComponent,
    CoinsExpendPanelComponent,
    CoinsToggleComponent,
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
