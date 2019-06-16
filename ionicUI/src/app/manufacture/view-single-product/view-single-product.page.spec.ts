import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleProductPage } from './view-single-product.page';

describe('ViewSingleProductPage', () => {
  let component: ViewSingleProductPage;
  let fixture: ComponentFixture<ViewSingleProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleProductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
