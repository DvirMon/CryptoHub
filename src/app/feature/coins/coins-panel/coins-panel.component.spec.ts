import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsPanelComponent } from './coins-panel.component';

describe('CoinsPanelComponent', () => {
  let component: CoinsPanelComponent;
  let fixture: ComponentFixture<CoinsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoinsPanelComponent]
    });
    fixture = TestBed.createComponent(CoinsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
