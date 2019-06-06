import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendorPage } from './view-vendor.page';

describe('ViewVendorPage', () => {
  let component: ViewVendorPage;
  let fixture: ComponentFixture<ViewVendorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVendorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
