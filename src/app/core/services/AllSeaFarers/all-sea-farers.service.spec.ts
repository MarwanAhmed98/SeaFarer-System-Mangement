import { TestBed } from '@angular/core/testing';

import { AllSeaFarersService } from './all-sea-farers.service';

describe('AllSeaFarersService', () => {
  let service: AllSeaFarersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllSeaFarersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
