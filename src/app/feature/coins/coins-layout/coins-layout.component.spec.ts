import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsLayoutComponent } from './coins-layout.component';

describe('CoinsLayoutComponent', () => {
  let component: CoinsLayoutComponent;
  let fixture: ComponentFixture<CoinsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoinsLayoutComponent]
    });
    fixture = TestBed.createComponent(CoinsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
