import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGlobalPlayer } from './app-global-player';

describe('AppGlobalPlayer', () => {
  let component: AppGlobalPlayer;
  let fixture: ComponentFixture<AppGlobalPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppGlobalPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppGlobalPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
