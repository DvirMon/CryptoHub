import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsService } from '../coins.service';

@Component({
  selector: 'app-coins-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coins-layout.component.html',
  styleUrls: ['./coins-layout.component.scss']
})
export class CoinsLayoutComponent {

  coinsService : CoinsService = inject(CoinsService)

  coins$ = this.coinsService.getCoins();

}
