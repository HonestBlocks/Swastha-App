import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingPage } from './packaging.page';

describe('PackagingPage', () => {
  let component: PackagingPage;
  let fixture: ComponentFixture<PackagingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
