import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegulatorPage } from './add-regulator.page';

describe('AddRegulatorPage', () => {
  let component: AddRegulatorPage;
  let fixture: ComponentFixture<AddRegulatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRegulatorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegulatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
