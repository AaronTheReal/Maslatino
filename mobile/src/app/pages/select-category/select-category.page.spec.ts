import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectCategoryPage } from './select-category.page';

describe('SelectCategoryPage', () => {
  let component: SelectCategoryPage;
  let fixture: ComponentFixture<SelectCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
