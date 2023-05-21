import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/dialog/dialog.service';

import { environment } from 'src/environments/environment';
import { CoinsService } from '../coins.service';
import { Coin } from 'src/app/models/coin.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TypographyComponent } from 'src/app/shared/components/typography/typography.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-coins-dialog',
  templateUrl: './coins-dialog.component.html',
  styleUrls: ['./coins-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, TypographyComponent, MatButtonModule, MatDividerModule, MatDialogModule, MatSlideToggleModule]

})
export class CoinsDialogComponent implements OnInit {

  public development: boolean = environment.production
  public payload: unknown

  readonly title: string = 'You can choose up to 5 coins'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<CoinsDialogComponent>,
    private coinsService: CoinsService,
    // private toggleService: ToggleService

  ) {
    // this.payload = this.data.payload
  }


  ngOnInit(): void {
  }

  public onClose() {
    // this.toggleService.toggleState.next([this.payload.lastSelect])

  }

  public handleToggle(coin: Coin) {
    // this.coinsService.deleteSelectedCoin(coin.id)
    // this.coinsService.addSelectedCoin(this.payload.lastSelect)
    // this.toggleService.toggleData.next({ coin, lastSelect: this.payload.lastSelect })

  }




}
