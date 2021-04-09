import { TestBed } from '@angular/core/testing';

import { ApifruitsService } from './apifruits.service';

describe('ApifruitsService', () => {
  let service: ApifruitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApifruitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
