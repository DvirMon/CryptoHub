import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { CoinModel } from '../models/coin.model';

@Directive({
  selector: '[appTextSize]'
})
export class TextSizeDirective implements OnInit {

  @Input() length: number
  @Input() state: string
  @Input() coin: CoinModel

  @HostBinding("style.fontSize") public fontSize: string;

  constructor() {
  }

  ngOnInit() {

    if (this.state === "symbol") {

      this.coin.symbol.length < 15
        ? this.fontSize = "30px"
        : this.fontSize = "22px"
    }

    // if (this.state === "id") {

    //   this.coin.id.length < 15
    //     ? this.fontSize = "30px"
    //     : this.fontSize = "15px"
    // }

  }


}
