import { TestBed } from '@angular/core/testing';

import { GestoreAnimaliService } from './gestore-animali.service';

describe('GestoreAnimaliService', () => {
  let service: GestoreAnimaliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestoreAnimaliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
