import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsInfoComponent } from './coins-info.component';

describe('CoinsInfoComponent', () => {
  let component: CoinsInfoComponent;
  let fixture: ComponentFixture<CoinsInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoinsInfoComponent]
    });
    fixture = TestBed.createComponent(CoinsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
