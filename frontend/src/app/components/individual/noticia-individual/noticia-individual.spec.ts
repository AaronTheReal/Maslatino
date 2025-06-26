import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaIndividual } from './noticia-individual';

describe('NoticiaIndividual', () => {
  let component: NoticiaIndividual;
  let fixture: ComponentFixture<NoticiaIndividual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaIndividual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaIndividual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
