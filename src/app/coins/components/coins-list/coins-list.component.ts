import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinsService } from 'src/app/services/coins.service';
import { FormService } from 'src/app/services/form.service';
import { CoinModel } from 'src/app/utilities/models/coin-model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {

  public coins: CoinModel[] = []; 
  public isMobile : Observable<boolean> = this.formService.isMobile()

  constructor(
    private coinService  :CoinsService,
    private formService : FormService
  ) { }
  
  ngOnInit(): void {
    this.coinService.getCoins(1)
    this.subscribeToStore()
  }

  private subscribeToStore() {
    store.subscribe(() => {
      this.coins = store.getState().coins.coins
    })
  }


}
