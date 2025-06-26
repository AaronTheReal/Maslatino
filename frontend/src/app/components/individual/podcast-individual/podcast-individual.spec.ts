import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastIndividual } from './podcast-individual';

describe('PodcastIndividual', () => {
  let component: PodcastIndividual;
  let fixture: ComponentFixture<PodcastIndividual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PodcastIndividual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodcastIndividual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
