import { TestBed } from '@angular/core/testing';

import { RideProvidersDataService } from './ride-providers-data.service';

describe('RideProvidersDataService', () => {
  let service: RideProvidersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideProvidersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
