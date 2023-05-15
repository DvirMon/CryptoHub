import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLayoutComponent } from './chart-layout.component';

describe('ChartLayoutComponent', () => {
  let component: ChartLayoutComponent;
  let fixture: ComponentFixture<ChartLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChartLayoutComponent]
    });
    fixture = TestBed.createComponent(ChartLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
