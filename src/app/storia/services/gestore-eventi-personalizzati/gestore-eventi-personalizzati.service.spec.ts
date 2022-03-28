import { TestBed } from '@angular/core/testing';

import { GestoreEventiPersonalizzatiService } from './gestore-eventi-personalizzati.service';

describe('GestoreEventiPersonalizzatiService', () => {
  let service: GestoreEventiPersonalizzatiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestoreEventiPersonalizzatiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
