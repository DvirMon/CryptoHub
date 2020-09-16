import { Component, Input, OnInit } from '@angular/core';
import { CoinModel } from 'src/app/utilities/models/coin-model';

@Component({
  selector: 'app-coins-search-item',
  templateUrl: './coins-search-item.component.html',
  styleUrls: ['./coins-search-item.component.scss']
})
export class CoinsSearchItemComponent implements OnInit {

  @Input() coin : CoinModel

  constructor() { }

  ngOnInit(): void {
  }

}
