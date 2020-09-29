import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-coins-bar',
  templateUrl: './coins-bar.component.html',
  styleUrls: ['./coins-bar.component.scss']
})
export class CoinsBarComponent implements AfterViewInit {


  public isMobile: Observable<boolean> = this.formService.isMobile()

  constructor(
    private formService: FormService,
    private sidenavService: SideNavService

  ) { }


  ngAfterViewInit(): void {
  }

  public toggleSideNav() {
    console.log(this.sidenavService.sidenav)
    this.sidenavService.toggle()
  }
}
