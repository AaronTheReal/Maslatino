import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioIndividual } from './radio-individual';

describe('RadioIndividual', () => {
  let component: RadioIndividual;
  let fixture: ComponentFixture<RadioIndividual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioIndividual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioIndividual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
