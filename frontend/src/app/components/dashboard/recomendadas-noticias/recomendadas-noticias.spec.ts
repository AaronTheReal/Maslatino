import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendadasNoticias } from './recomendadas-noticias';

describe('RecomendadasNoticias', () => {
  let component: RecomendadasNoticias;
  let fixture: ComponentFixture<RecomendadasNoticias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendadasNoticias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendadasNoticias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
