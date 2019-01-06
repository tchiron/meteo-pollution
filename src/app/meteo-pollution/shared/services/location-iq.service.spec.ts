import { TestBed } from '@angular/core/testing';

import { LocationIqService } from './location-iq.service';

describe('LocationIqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationIqService = TestBed.get(LocationIqService);
    expect(service).toBeTruthy();
  });
});
