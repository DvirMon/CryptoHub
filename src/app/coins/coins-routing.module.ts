import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoinsRootComponent } from './components/coins-grid/coins-root/coins-root.component';
import { CoinsListComponent } from './components/coins-grid/coins-list/coins-list.component';

import { CoinsResolver} from 'src/app/utilities/resolver/coins.resolver'
 
const routes: Routes = [
  {
    path: "", component: CoinsRootComponent, children: [
      { path: "list", component: CoinsListComponent, resolve : {coins : CoinsResolver} },
      { path: "charts", loadChildren: () => import('../charts/chart.module').then(m => m.ChartModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsRoutingModule { }
