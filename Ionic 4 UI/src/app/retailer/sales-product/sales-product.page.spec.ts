import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesProductPage } from './sales-product.page';

describe('SalesProductPage', () => {
  let component: SalesProductPage;
  let fixture: ComponentFixture<SalesProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesProductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
