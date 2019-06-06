import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoPage } from './view-po.page';

describe('ViewPoPage', () => {
  let component: ViewPoPage;
  let fixture: ComponentFixture<ViewPoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
