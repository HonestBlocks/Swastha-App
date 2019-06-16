import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorPage } from './add-vendor.page';

describe('AddVendorPage', () => {
  let component: AddVendorPage;
  let fixture: ComponentFixture<AddVendorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
