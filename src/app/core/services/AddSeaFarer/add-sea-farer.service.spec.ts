import { TestBed } from '@angular/core/testing';

import { AddSeaFarerService } from './add-sea-farer.service';

describe('AddSeaFarerService', () => {
  let service: AddSeaFarerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSeaFarerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
