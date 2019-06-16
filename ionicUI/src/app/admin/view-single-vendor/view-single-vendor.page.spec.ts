import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleVendorPage } from './view-single-vendor.page';

describe('ViewSingleVendorPage', () => {
  let component: ViewSingleVendorPage;
  let fixture: ComponentFixture<ViewSingleVendorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleVendorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
