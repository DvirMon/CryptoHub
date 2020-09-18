import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { DialogService } from 'src/app/services/dialog.service';

import { Observable } from 'rxjs';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ChartGuard implements CanActivate {

  constructor(
    private dialogService: DialogService
  ) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.handleGuard();
  }

  private isSelectedCoins(): boolean {
    return !!store.getState().coins.selectedCoins.length
  }

  private handleGuard() {

    if (this.isSelectedCoins()) {
      return true
    }
    else {
      this.dialogService.handleErrorDialog({ error: "Please choose at least one coin to continue" })
      return false
    }


  }



}
