import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-nav',
  templateUrl: './coins-nav.component.html',
  styleUrls: ['./coins-nav.component.scss']
})
export class CoinsNavComponent implements OnInit {

  @Input() drawer: MatSidenav
  public selectedCoins: string[] = []
  public isMobile: Observable<boolean> = this.formService.isMobile()

  public routers = [
    { label: "Home", route: "/coins/list", icon: "home" },
    { label: "Real-Time Charts", route: "/coins/charts", icon: "insert_chart" },
    { label: "About Me", route: "/coins/info", icon: "info" },
  ]

  constructor(
    private formService: FormService
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

  public toggleSearch() {

    this.formService.toggleSearch.next(false)
    
  }

}
