import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CoinsService } from 'src/app/services/coins.service';
import { FormService } from 'src/app/services/form.service';
import { CoinModel } from 'src/app/utilities/models/coin.model';

@Component({
  selector: 'app-coins-select-web',
  templateUrl: './coins-select-web.component.html',
  styleUrls: ['./coins-select-web.component.scss']
})
export class CoinsSelectWebComponent implements OnInit {

  @ViewChild(MatDrawer) drawer: MatDrawer

  @Input() selectedCoins: CoinModel[] = []

  private coinsToDelete: string[] = []
  private deleteAll: boolean

  constructor(
    private coinsService: CoinsService

  ) { }

  ngOnInit(): void {
  }

  // EVENTS SECTION

  public handleToggle() {

    this.drawer.toggle()

    if (!this.drawer.opened) {
      this.handleCoinDelete()
      this.handleDeleteAll()
    }

  }

  // EMIT EVENTS SECTION
  public handleEmitDelete(coinId: string) {
    this.coinsToDelete.push(coinId)
  }

  public handleEmitDeleteAll() {
    this.deleteAll = true
  }

  // LOGIC SECTION
  private handleCoinDelete() {
    this.coinsToDelete.map((coinId: string) => {
      this.coinsService.deleteSelectedCoin(coinId)
    })
  }

  private handleDeleteAll() {
    if (this.deleteAll) {
      this.coinsService.deleteAllSelectedCoin()
      this.deleteAll = false
    }
  }


}
