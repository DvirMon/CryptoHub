import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: "welcome", component: HomeComponent },
  { path: "coins", loadChildren: () => import('./coins/coins.module').then(m => m.CoinsModule) },
  { path: "charts", loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
  { path: "info", component: AboutComponent },
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
