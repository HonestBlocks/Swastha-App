import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegulatorPage } from './view-regulator.page';

describe('ViewRegulatorPage', () => {
  let component: ViewRegulatorPage;
  let fixture: ComponentFixture<ViewRegulatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRegulatorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegulatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
