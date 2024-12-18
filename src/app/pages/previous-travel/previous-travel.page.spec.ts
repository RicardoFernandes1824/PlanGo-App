import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviousTravelPage } from './previous-travel.page';

describe('PreviousTravelPage', () => {
  let component: PreviousTravelPage;
  let fixture: ComponentFixture<PreviousTravelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousTravelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
