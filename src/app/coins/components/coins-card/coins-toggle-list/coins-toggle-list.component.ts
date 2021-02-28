import { Component, Input, OnInit } from '@angular/core';

// IMPORT ANGULAR ANIMATIONS
import { animate, state, style, transition, trigger } from '@angular/animations';

import { CoinsService } from 'src/app/services/coins.service';
import { ToggleService } from 'src/app/services/toggle.service';

import { CoinModel } from 'src/app/utilities/models/coin.model';
import { CoinsDialogComponent } from '../../coins-dialog/coins-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


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
export class CoinsToggleListComponent implements OnInit {


  @Input() dialog: boolean
  @Input() selectedCoins: CoinModel[]
  @Input() lastSelect: CoinModel
  @Input() dialogRef: MatDialogRef<CoinsDialogComponent>

  public checked: boolean

  constructor(
    private coinsService: CoinsService,
    private toggleService: ToggleService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  public unSelectAll(event: any) {

    event.stopPropagation()
    this.checked = false
    this.toggleService.toggleAllSelectedCoins()
    this.coinsService.deleteAllSelectedCoin()
    this.router.navigateByUrl('/coins')
  }


}
