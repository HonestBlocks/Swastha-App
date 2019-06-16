import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcPage } from './qc.page';

describe('QcPage', () => {
  let component: QcPage;
  let fixture: ComponentFixture<QcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
