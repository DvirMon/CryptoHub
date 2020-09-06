import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 
  public routers = [
    { label: "Home", route: "welcome", icon: "home" },
    { label: "Real-Time Charts", route: "charts", icon: "insert_chart" },
    { label: "About Me", route: "info", icon: "info" },

  ]

  constructor(private breakpointObserver: BreakpointObserver) { }

}
