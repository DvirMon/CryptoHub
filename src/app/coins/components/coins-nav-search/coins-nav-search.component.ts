import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSidenav } from '@angular/material/sidenav';


import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { SearchService } from 'src/app/services/search.service';
import { CoinModel } from 'src/app/utilities/models/coin-model';
import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-coins-nav-search',
  templateUrl: './coins-nav-search.component.html',
  styleUrls: ['./coins-nav-search.component.scss']
})
export class CoinsNavSearchComponent implements OnInit {


  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatAutocompleteTrigger) panel: MatAutocompleteTrigger;


  public searchControl = new FormControl();
  public searchEntries: CoinModel[];
  public searchResults: Observable<number>;
  public isMobile: Observable<boolean> = this.formService.isMobile()

  public results: boolean;

  public toggleSearch: boolean = false


  constructor(
    private searchService: SearchService,
    private formService: FormService

  ) { }


  ngOnInit(): void {
    this.search();
    this.subscribeToResults()
    this.subscribeToSearchEntries()
  }

  // SUBSCRIPTION SECTION


  private subscribeToResults() {
    this.searchService.results.subscribe(
      (results) => {
        this.results = results
      }
    )
  }
  private subscribeToSearchEntries() {
    this.searchService.searchEntries.subscribe(
      (searchEntries) => {

        searchEntries.subscribe(
          (coins) => {
            this.searchEntries = store.getState().coins.coins

          }
        )
      }
    )
  }



  // LOGIC SECTION

  // main search function

  public search(): void {
    this.searchService.handleSearch(this.searchControl).subscribe(
      () => {
        this.searchInput.nativeElement.focus()
      },
      (err) => {
        console.log(err)
        this.searchInput.nativeElement.focus()
      }
    )
  }

  public onSelect(option: string) {
  }



}
