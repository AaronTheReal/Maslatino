import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasNoticias } from './ultimas-noticias';

describe('UltimasNoticias', () => {
  let component: UltimasNoticias;
  let fixture: ComponentFixture<UltimasNoticias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimasNoticias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimasNoticias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
