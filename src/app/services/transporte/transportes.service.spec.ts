import { TestBed } from '@angular/core/testing';

import { TransportesService } from './transportes.service';

describe('TransportesService', () => {
  let service: TransportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
