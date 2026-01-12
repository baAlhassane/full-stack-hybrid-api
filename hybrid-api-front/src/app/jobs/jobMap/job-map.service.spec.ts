import { TestBed } from '@angular/core/testing';

import { JobMapService } from './job-map.service';

describe('JobMapService', () => {
  let service: JobMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
