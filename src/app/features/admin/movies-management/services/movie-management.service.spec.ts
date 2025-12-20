import { TestBed } from '@angular/core/testing';

import { MovieManagementService } from './movie-management.service';

describe('MovieManagementService', () => {
  let service: MovieManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
