import { TestBed } from '@angular/core/testing';

import { IndirizziService } from './indirizzi.service';

describe('IndirizziService', () => {
  let service: IndirizziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndirizziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
