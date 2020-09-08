import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinsRootComponent } from './components/coins-root/coins-root.component';
import { CoinsListComponent } from './components/coins-card/coins-list/coins-list.component';
import { AboutComponent } from '../components/about/about.component';

 
const routes: Routes = [
  {
    path: "", component: CoinsRootComponent, children: [
      { path: "list", component: CoinsListComponent },
      { path: "charts", loadChildren: () => import('../charts/charts.module').then(m => m.ChartsModule) },
      { path: "info", component: AboutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsRoutingModule { }
