import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroTourPage } from './intro-tour.page';

describe('IntroTourPage', () => {
  let component: IntroTourPage;
  let fixture: ComponentFixture<IntroTourPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroTourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
