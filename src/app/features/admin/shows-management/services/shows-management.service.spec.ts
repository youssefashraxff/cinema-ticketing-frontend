import { TestBed } from '@angular/core/testing';

import { ShowsManagementService } from './shows-management.service';

describe('ShowsManagementService', () => {
  let service: ShowsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
