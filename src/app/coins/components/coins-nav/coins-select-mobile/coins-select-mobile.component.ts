import { Component, Input, OnInit } from '@angular/core';
import { CoinsService } from 'src/app/services/coins.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { CoinModel } from 'src/app/utilities/models/coin.model';

@Component({
  selector: 'app-coins-select-mobile',
  templateUrl: './coins-select-mobile.component.html',
  styleUrls: ['./coins-select-mobile.component.scss']
})
export class CoinsSelectMobileComponent implements OnInit {

  @Input() selectedCoins: CoinModel[] = []


  constructor(
    private coinsService: CoinsService,
    private toggleService: ToggleService
  ) { }

  ngOnInit(): void {
  }

    // LOGIC SECTION

    public deleteCoins() {
      this.toggleService.toggleAllSelectedCoins()
      this.coinsService.deleteAllSelectedCoin()
      
    }
  

}
