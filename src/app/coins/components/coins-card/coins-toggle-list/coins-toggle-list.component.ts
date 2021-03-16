// ANGULAR CORE
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// ANGULAR ANIMATIONS
import { animate, state, style, transition, trigger } from '@angular/animations';

import { CoinsDialogComponent } from '../../coins-dialog/coins-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

// SERVICES
import { CoinsService } from 'src/app/services/coins.service';
import { ToggleService } from 'src/app/services/toggle.service';

// MODELS
import { CoinModel } from 'src/app/utilities/models/coin.model';


@Component({
  selector: 'app-coins-toggle-list',
  templateUrl: './coins-toggle-list.component.html',
  styleUrls: ['./coins-toggle-list.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
    ]),
  ],
})
export class CoinsToggleListComponent  {

  @Input() dialog: boolean
  @Input() selectedCoins: CoinModel[]
  @Input() lastSelect: CoinModel
  @Input() dialogRef: MatDialogRef<CoinsDialogComponent>

  public checked: boolean

  constructor(
    private coinsService: CoinsService,
    private toggleService: ToggleService,
    private router: Router
  ) { }

  public unSelectAll(event: any) {

    event.stopPropagation()
    this.checked = false
    this.toggleService.toggleAllSelectedCoins()
    this.coinsService.deleteAllSelectedCoin()
    this.router.navigateByUrl('/coins')
  }


}
