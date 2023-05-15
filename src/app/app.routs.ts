import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PnfComponent } from "./components/pnf/pnf.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  // { path: "coins", loadChildren: () => import('./coins/coins.module').then(m => m.CoinsModule) },
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "**", component: PnfComponent }
];
