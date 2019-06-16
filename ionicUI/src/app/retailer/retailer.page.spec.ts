import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerPage } from './retailer.page';

describe('RetailerPage', () => {
  let component: RetailerPage;
  let fixture: ComponentFixture<RetailerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
