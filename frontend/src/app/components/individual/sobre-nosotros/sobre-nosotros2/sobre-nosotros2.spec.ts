import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreNosotros2 } from './sobre-nosotros2';

describe('SobreNosotros2', () => {
  let component: SobreNosotros2;
  let fixture: ComponentFixture<SobreNosotros2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreNosotros2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreNosotros2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
