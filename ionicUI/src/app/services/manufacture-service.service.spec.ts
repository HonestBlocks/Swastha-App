import { TestBed } from '@angular/core/testing';

import { ManufactureServiceService } from './manufacture-service.service';

describe('ManufactureServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManufactureServiceService = TestBed.get(ManufactureServiceService);
    expect(service).toBeTruthy();
  });
});
