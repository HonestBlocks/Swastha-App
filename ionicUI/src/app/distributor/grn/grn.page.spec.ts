import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnPage } from './grn.page';

describe('GrnPage', () => {
  let component: GrnPage;
  let fixture: ComponentFixture<GrnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
