import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsCardComponent } from './coins-card.component';

describe('CoinsCardComponent', () => {
  let component: CoinsCardComponent;
  let fixture: ComponentFixture<CoinsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoinsCardComponent]
    });
    fixture = TestBed.createComponent(CoinsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
