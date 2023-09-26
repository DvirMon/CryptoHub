import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSearchItemComponent } from './coin-search-item.component';

describe('CoinSearchItemComponent', () => {
  let component: CoinSearchItemComponent;
  let fixture: ComponentFixture<CoinSearchItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoinSearchItemComponent]
    });
    fixture = TestBed.createComponent(CoinSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
