import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinsListComponent } from './components/coins-list/coins-list.component';
import { CoinsRootComponent } from './components/coins-root/coins-root.component';


const routes: Routes = [
  {
    path: "", component: CoinsRootComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsRoutingModule { }
