import { TestBed } from '@angular/core/testing';

import { VisaIdService } from './visa-id.service';

describe('VisaIdService', () => {
  let service: VisaIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisaIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
