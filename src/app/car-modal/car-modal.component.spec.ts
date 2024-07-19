import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModalComponent } from './car-modal.component';

describe('CarModalComponent', () => {
  let component: CarModalComponent;
  let fixture: ComponentFixture<CarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarModalComponent]
    });
    fixture = TestBed.createComponent(CarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
