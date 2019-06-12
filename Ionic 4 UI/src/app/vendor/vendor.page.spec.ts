import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPage } from './vendor.page';

describe('VendorPage', () => {
  let component: VendorPage;
  let fixture: ComponentFixture<VendorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
