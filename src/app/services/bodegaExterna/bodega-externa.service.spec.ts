import { TestBed } from '@angular/core/testing';

import { BodegaExternaService } from './bodega-externa.service';

describe('BodegaExternaService', () => {
  let service: BodegaExternaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodegaExternaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
