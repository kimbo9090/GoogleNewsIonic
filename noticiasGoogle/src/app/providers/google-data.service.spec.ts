import { TestBed } from '@angular/core/testing';

import { GoogleDataService } from './google-data.service';

describe('GoogleDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleDataService = TestBed.get(GoogleDataService);
    expect(service).toBeTruthy();
  });
});
