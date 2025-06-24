import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioPrincipal } from './anuncio-principal';

describe('AnuncioPrincipal', () => {
  let component: AnuncioPrincipal;
  let fixture: ComponentFixture<AnuncioPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnuncioPrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnuncioPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
