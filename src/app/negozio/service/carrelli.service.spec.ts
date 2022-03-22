import { TestBed } from '@angular/core/testing';

import { CarrelliService } from './carrelli.service';

describe('CarrelliService', () => {
  let service: CarrelliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrelliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
