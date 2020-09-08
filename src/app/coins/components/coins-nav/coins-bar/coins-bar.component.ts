import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { SearchService } from 'src/app/services/search.service';
import { CoinModel } from 'src/app/utilities/models/coin-model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-bar',
  templateUrl: './coins-bar.component.html',
  styleUrls: ['./coins-bar.component.scss']
})
export class CoinsBarComponent implements OnInit {

  public selectedCoins: string[] = []
  public isMobile: Observable<boolean> = this.formService.isMobile()

  public routers = [
    { label: "Home", route: "/coins/list", icon: "home" },
    { label: "Real-Time Charts", route: "/coins/charts", icon: "insert_chart" },
    { label: "About Me", route: "/coins/info", icon: "info" },

  ]

  constructor(
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
  }

  private subscribeToStore() {
    store.subscribe(
      () => {
        this.selectedCoins = store.getState().coins.selectedCoins
      }
    )
    this.selectedCoins = store.getState().coins.selectedCoins
  }

}
