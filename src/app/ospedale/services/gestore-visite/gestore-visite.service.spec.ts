import { TestBed } from '@angular/core/testing';

import { GestoreVisiteService } from './gestore-visite.service';

describe('GestoreVisiteService', () => {
  let service: GestoreVisiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestoreVisiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
