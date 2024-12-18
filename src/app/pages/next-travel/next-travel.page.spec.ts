import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NextTravelPage } from './next-travel.page';

describe('NextTravelPage', () => {
  let component: NextTravelPage;
  let fixture: ComponentFixture<NextTravelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTravelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
