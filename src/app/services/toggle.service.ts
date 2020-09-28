import { Injectable } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Subject } from 'rxjs';
import { CoinModel } from '../utilities/models/coin.model';
import { store } from '../utilities/redux/store';
import { CoinsService } from './coins.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  public selectedCoins: CoinModel[] = []

  public toggleData: Subject<{ coin?: CoinModel, lastSelect?: CoinModel }> = new Subject()
  public toggleState: Subject<CoinModel[]> = new Subject()

  constructor(
  ) { }



  public toggleAllSelectedCoins() {
    const selectedCoins: CoinModel[] = store.getState().coins.selectedCoins
    this.toggleState.next(selectedCoins)
  }


 

}
