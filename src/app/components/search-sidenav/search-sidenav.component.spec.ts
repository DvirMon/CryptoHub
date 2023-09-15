import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSidenavComponent } from './search-sidenav.component';

describe('SearchSidenavComponent', () => {
  let component: SearchSidenavComponent;
  let fixture: ComponentFixture<SearchSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchSidenavComponent]
    });
    fixture = TestBed.createComponent(SearchSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
