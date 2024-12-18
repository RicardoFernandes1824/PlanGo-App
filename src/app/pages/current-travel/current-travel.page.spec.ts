import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentTravelPage } from './current-travel.page';

describe('CurrentTravelPage', () => {
  let component: CurrentTravelPage;
  let fixture: ComponentFixture<CurrentTravelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTravelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
