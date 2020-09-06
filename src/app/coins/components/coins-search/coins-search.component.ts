import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSidenav } from '@angular/material/sidenav';


import { Observable } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-coins-search',
  templateUrl: './coins-search.component.html',
  styleUrls: ['./coins-search.component.scss']
})
export class CoinsSearchComponent implements OnInit {

  @Input() drawer: MatSidenav
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatAutocompleteTrigger) panel: MatAutocompleteTrigger;


  public searchControl = new FormControl();
  public searchEntries: Observable<string[]>;
  public searchResults: Observable<number>;
  public isMobile: Observable<boolean> = this.formService.isMobile()

  public results: boolean;

  public toggleSearch: boolean = false
  public mobile: boolean;


  constructor(
    private searchService: SearchService,
    private formService: FormService

  ) { }


  ngOnInit(): void {
    this.search();
    this.subscribeToMobile()
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
      }
    )
  }

  private subscribeToMobile() {
    this.isMobile.subscribe(
      (isMobile: boolean) => {

        this.toggleSearch = false
        this.mobile = isMobile

        if (!isMobile) {
          this.drawer.toggle(false)
        }
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

  public handleToggleSearch() {

    this.mobile
      ? this.drawer.toggle()
      : this.toggleSearch = !this.toggleSearch

  }

  public onSelect(option: string) {
  }



}
