import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSinglePoPage } from './view-single-po.page';

describe('ViewSinglePoPage', () => {
  let component: ViewSinglePoPage;
  let fixture: ComponentFixture<ViewSinglePoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSinglePoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSinglePoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
