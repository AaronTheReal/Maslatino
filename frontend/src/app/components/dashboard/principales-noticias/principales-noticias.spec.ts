import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalesNoticias } from './principales-noticias';

describe('PrincipalesNoticias', () => {
  let component: PrincipalesNoticias;
  let fixture: ComponentFixture<PrincipalesNoticias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalesNoticias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalesNoticias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
