import { Routes } from "@angular/router";
import { LandingComponent } from "./pages/landing/landing.component";
import { PnfComponent } from "./pages/pnf/pnf.component";

export const appRoutes: Routes = [
  { path: "", component: LandingComponent },
  {
    path: "coins",
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "**", component: PnfComponent }
];
