import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatorPage } from './regulator.page';

describe('RegulatorPage', () => {
  let component: RegulatorPage;
  let fixture: ComponentFixture<RegulatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulatorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
