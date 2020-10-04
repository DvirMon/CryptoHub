import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartCardModel } from 'src/app/utilities/models/chart-card.mode';
import { CoinModel } from 'src/app/utilities/models/coin.model';

@Component({
  selector: 'app-chart-menu',
  templateUrl: './chart-menu.component.html',
  styleUrls: ['./chart-menu.component.scss']
})
export class ChartMenuComponent implements OnInit {

  @Input() card: ChartCardModel
  @Input() selectedCoins: CoinModel[]
  @Input() currencies: string[]

  @Output() changeChart: EventEmitter<{ payload: string, type: string }> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  } 
 
  // LOGIC SECTION
  public handleMenuChange(payload: string, type: string) {
    this.changeChart.emit({ payload, type })
  }


}
