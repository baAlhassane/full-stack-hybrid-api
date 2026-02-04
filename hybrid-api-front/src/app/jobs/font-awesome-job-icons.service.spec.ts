import { TestBed } from '@angular/core/testing';

import { FontAwesomeJobIconsService } from './font-awesome-job-icons.service';

describe('FontAwesomeJobIconsService', () => {
  let service: FontAwesomeJobIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontAwesomeJobIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
