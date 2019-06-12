import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleSoPage } from './view-single-so.page';

describe('ViewSingleSoPage', () => {
  let component: ViewSingleSoPage;
  let fixture: ComponentFixture<ViewSingleSoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleSoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleSoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
