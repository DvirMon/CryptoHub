import { Injectable } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActionType } from '../utilities/redux/action-type';
import { store } from '../utilities/redux/store';


@Injectable({
  providedIn: 'root'
})

export class FormService {

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }


  // LOGIC SECTION

  public handleStore(type: ActionType, payload?: any): void {
    store.dispatch({ type, payload })
  }

  public isMobile(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }
  
  public handleIsMobile() {
    return this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      ).subscribe(
        (isMobile) => { 
          this.handleStore(ActionType.Mobile, isMobile)
        }
      )
  }


}