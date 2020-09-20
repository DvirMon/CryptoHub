import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinsRootComponent } from './components/coins-root/coins-root.component';
import { AboutComponent } from '../components/about/about.component';
import { CoinsPanelComponent } from './components/coins-grid/coins-panel/coins-panel.component';
import { CoinsPanelSearchComponent } from './components/coins-grid/coins-panel-search/coins-panel-search.component';

 
const routes: Routes = [
  {
    path: "", component: CoinsRootComponent, children: [
      { path: "list", component: CoinsPanelComponent },
      { path: "search", component: CoinsPanelSearchComponent },
      { path: "charts", loadChildren: () => import('../charts/chart.module').then(m => m.ChartModule) },
      { path: "info", component: AboutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsRoutingModule { }
