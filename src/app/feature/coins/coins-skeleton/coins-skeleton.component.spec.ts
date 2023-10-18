import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsSkeletonComponent } from './coins-skeleton.component';

describe('CoinsSkeletonComponent', () => {
  let component: CoinsSkeletonComponent;
  let fixture: ComponentFixture<CoinsSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoinsSkeletonComponent]
    });
    fixture = TestBed.createComponent(CoinsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
