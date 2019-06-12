import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturePage } from './manufacture.page';

describe('ManufacturePage', () => {
  let component: ManufacturePage;
  let fixture: ComponentFixture<ManufacturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
