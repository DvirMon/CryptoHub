import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

import { FormService } from 'src/app/services/form.service';
import { SearchService } from 'src/app/services/search.service';
import { CoinModel } from 'src/app/utilities/models/coin-model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-coins-nav-search',
  templateUrl: './coins-nav-search.component.html',
  styleUrls: ['./coins-nav-search.component.scss']
})
export class CoinsNavSearchComponent implements OnInit {

  @Input() drawer: MatSidenav
  @ViewChild('searchInput') searchInput: ElementRef;

  public searchControl = new FormControl();
  public searchEntries: Observable<CoinModel[]>;
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
        this.searchEntries = searchEntries

        // searchEntries.subscribe(
        //   (coins) => {

        //   }
        // )
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
