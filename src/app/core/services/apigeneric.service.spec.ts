import { TestBed } from '@angular/core/testing';

import { ApigenericService } from './apigeneric.service';

describe('ApigenericService', () => {
  let service: ApigenericService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApigenericService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
