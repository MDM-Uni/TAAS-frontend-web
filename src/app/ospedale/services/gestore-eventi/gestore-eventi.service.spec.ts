import { TestBed } from '@angular/core/testing';

import { GestoreEventiService } from './gestore-eventi.service';

describe('GestoreVisiteService', () => {
  let service: GestoreEventiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestoreEventiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
