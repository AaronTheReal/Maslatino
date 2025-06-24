import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosNoticias } from './eventos-noticias';

describe('EventosNoticias', () => {
  let component: EventosNoticias;
  let fixture: ComponentFixture<EventosNoticias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosNoticias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosNoticias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
