import { Component, Input, OnInit } from '@angular/core';
import { CoinsService } from 'src/app/services/coins.service';

@Component({
  selector: 'app-coins-toggle',
  templateUrl: './coins-toggle.component.html',
  styleUrls: ['./coins-toggle.component.scss']
})
export class CoinsToggleComponent implements OnInit {

  @Input() coin: string
  @Input() lastSelect: string

  constructor(
    private coinsService: CoinsService
  ) {

  }

  ngOnInit(): void {
  }

  public handleToggle() {
    this.coinsService.deleteSelectedCoin(this.coin)
    this.coinsService.toggleSubject.next({ coin: this.coin, lastSelect: this.lastSelect })

  }
}
