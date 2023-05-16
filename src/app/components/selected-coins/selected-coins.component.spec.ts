import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCoinsComponent } from './selected-coins.component';

describe('SelectedCoinsComponent', () => {
  let component: SelectedCoinsComponent;
  let fixture: ComponentFixture<SelectedCoinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectedCoinsComponent]
    });
    fixture = TestBed.createComponent(SelectedCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
