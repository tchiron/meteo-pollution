import { TestBed } from '@angular/core/testing';

import { GeocodeIqService } from './geocode-iq.service';

describe('GeocodeIqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeocodeIqService = TestBed.get(GeocodeIqService);
    expect(service).toBeTruthy();
  });
});
