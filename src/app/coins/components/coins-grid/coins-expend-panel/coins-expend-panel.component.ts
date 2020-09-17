import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinsService } from 'src/app/services/coins.service';
import { FormService } from 'src/app/services/form.service';
import { CoinModel } from 'src/app/utilities/models/coin-model';
import { CurrencyModel } from 'src/app/utilities/models/currency-model';

@Component({
  selector: 'app-coins-expend-panel',
  templateUrl: './coins-expend-panel.component.html',
  styleUrls: ['./coins-expend-panel.component.scss']
})
export class CoinsExpendPanelComponent implements OnInit {

  

  @Input() coin: CoinModel;
  @Input() loader: boolean;


  public opened: boolean = false;
  private data: boolean = false
  public isMobile : Observable<boolean> = this.formService.isMobile()
  
  constructor(
    private coinsService: CoinsService,
    private formService : FormService,
    public currency: CurrencyModel
  ) { }

  ngOnInit(): void {
  }

  // HTTP SECTION 

  public getCoinData() {

    this.opened = true
    
    if (this.data) {
      return
    }

    
    this.coinsService.getCoinCurrency(this.coin.id).subscribe(
      (currency) => {
        this.currency = currency
        this.data = true
      }
    )
  }

  public deleteCoinData() {
    setTimeout(() => {
      this.data = false
    }, 120000)

    this.opened = false
  }
}
