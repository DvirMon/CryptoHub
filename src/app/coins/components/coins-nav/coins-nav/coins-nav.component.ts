import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { FormService } from 'src/app/services/form.service';

import { Observable } from 'rxjs';

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
  }

  public toggleSearch() {

    this.formService.toggleSearch.next(false)
    
  }


}
