import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinsRootComponent } from './components/coins-root/coins-root.component';
import { CoinsPanelComponent } from './components/coins-grid/coins-dashboard/coins-panel.component';
 
const routes: Routes = [
  {
    path: "", component: CoinsRootComponent, children: [
      { path: "list", component: CoinsPanelComponent },
      { path: "charts", loadChildren: () => import('../charts/chart.module').then(m => m.ChartModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsRoutingModule { }
