import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-coins-drawer',
  templateUrl: './coins-drawer.component.html',
  styleUrls: ['./coins-drawer.component.scss']
})
export class CoinsDrawerComponent implements OnInit, AfterViewInit {

  @ViewChild(MatDrawer) public sidenav: MatDrawer;


  constructor(
    private sidenavService: SideNavService

  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  

  
}
