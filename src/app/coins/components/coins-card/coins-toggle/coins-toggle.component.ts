import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// IMPORT ANGULAR ANIMATIONS
import { animate, state, style, transition, trigger } from '@angular/animations';

// IMPORT MATERIEL
import { MatDialogRef } from '@angular/material/dialog';

// IMPORT SERVICES
import { CoinsService } from 'src/app/services/coins.service';

// IMPORT MODELS
import { CoinModel } from 'src/app/utilities/models/coin.model';

// IMPORT COMPONENTS
import { CoinsDialogComponent } from '../../coins-dialog/coins-dialog.component';

@Component({
  selector: 'app-coins-toggle',
  templateUrl: './coins-toggle.component.html',
  styleUrls: ['./coins-toggle.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      // transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class CoinsToggleComponent implements OnInit {


  @Input() dialog: boolean
  @Input() coins: CoinModel[]
  @Input() lastSelect: CoinModel
  @Input() dialogRef: MatDialogRef<CoinsDialogComponent>

  @Output() public delete = new EventEmitter<string>();
  @Output() public deleteAll = new EventEmitter<boolean>();

  public checked: boolean = true


  constructor(
    private coinsService: CoinsService,
  ) { }

  ngOnInit(): void {
    this.checked = true
  }

  public handleToggle(coin: CoinModel) {


    if (this.dialog) {
      this.coinsService.addSelectedCoin(this.lastSelect)
      this.coinsService.toggleData.next({ coin, lastSelect: this.lastSelect })

      setTimeout(() => {
        this.dialogRef.close()
      }, 500)
    }

    else {
      this.coinsService.toggleData.next({ coin })
    }


    this.delete.emit(coin.id)

    setTimeout(() => {
      // this.coinsService.deleteSelectedCoin(coin.id)
    }, 500)


  }

  public unSelectAll() {
    this.checked = false
    this.deleteAll.emit(true)

  }

}
