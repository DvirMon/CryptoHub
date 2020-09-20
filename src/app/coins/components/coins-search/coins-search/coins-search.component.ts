import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSidenav } from '@angular/material/sidenav';

import { FormService } from 'src/app/services/form.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SearchService } from 'src/app/services/search.service';

import { CoinModel } from 'src/app/utilities/models/coin.model';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coins-search',
  templateUrl: './coins-search.component.html',
  styleUrls: ['./coins-search.component.scss']
})
export class CoinsSearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatAutocompleteTrigger) panel: MatAutocompleteTrigger;

  public searchControl = new FormControl();
  public searchEntries: Observable<CoinModel[]>;

  public isMobile: Observable<boolean> = this.formService.isMobile()

  public results: boolean;
  public toggleSearch: boolean = false
  public mobile: boolean;

  constructor(
    private searchService: SearchService,
    private formService: FormService,
    private loaderService: LoaderService,
    private router : Router

  ) { }


  ngOnInit(): void {
    this.search();
    this.subscribeToResults()
    this.subscribeToSearchEntries()
    this.subscribeToToggleSearch()
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
        this.searchEntries = of(searchEntries)
      }
    )
  } 

  private subscribeToToggleSearch() {
    this.formService.toggleSearch.subscribe(
      (toggleSearch) => {
        this.toggleSearch = toggleSearch
      }
    )
  }

  // LOGIC SECTION

  // main search function

  public search(): void {

    this.searchService.search(this.searchControl).subscribe(
      () => {
        this.searchInput.nativeElement.focus()
        this.loaderService.gridLoader.next({ loader: false, progress: 100 })
      },
      (err) => {
        this.searchInput.nativeElement.focus()
        this.loaderService.gridLoader.next({ loader: false, progress: 100 })
      }
    )
  }

  public handleToggleSearch() {

    this.toggleSearch = !this.toggleSearch
    
    if(this.toggleSearch) {
      this.router.navigateByUrl('/coins/search')
    }

  }



}
