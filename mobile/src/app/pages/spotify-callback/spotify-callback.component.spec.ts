import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpotifyCallbackComponent } from './spotify-callback.component';

describe('SpotifyCallbackComponent', () => {
  let component: SpotifyCallbackComponent;
  let fixture: ComponentFixture<SpotifyCallbackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SpotifyCallbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpotifyCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
