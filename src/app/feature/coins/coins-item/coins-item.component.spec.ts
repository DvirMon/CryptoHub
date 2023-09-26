import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsItemComponent } from './coins-item.component';

describe('CoinsItemComponent', () => {
  let component: CoinsItemComponent;
  let fixture: ComponentFixture<CoinsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoinsItemComponent]
    });
    fixture = TestBed.createComponent(CoinsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
