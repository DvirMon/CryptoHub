import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinModel } from 'src/app/models/coin.model';

@Component({
  selector: 'app-coins-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coins-card.component.html',
  styleUrls: ['./coins-card.component.scss']
})
export class CoinsCardComponent {

  @Input() coin! : CoinModel

}
