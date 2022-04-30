import { TestBed } from '@angular/core/testing';

import { GestoreUtenteService } from './gestore-utente.service';

describe('GestoreUtenteService', () => {
  let service: GestoreUtenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestoreUtenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
