import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorPage } from './distributor.page';

describe('DistributorPage', () => {
  let component: DistributorPage;
  let fixture: ComponentFixture<DistributorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
