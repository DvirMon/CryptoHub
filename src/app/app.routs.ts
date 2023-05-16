import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PnfComponent } from "./components/pnf/pnf.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "coins",
    loadComponent: () => import('./feature/coins/coins-layout/coins-layout.component').then(m => m.CoinsLayoutComponent)
  },
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "**", component: PnfComponent }
];
