import { TestBed } from '@angular/core/testing';

import { PalletizadoService } from './palletizado.service';

describe('PalletizadoService', () => {
  let service: PalletizadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalletizadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
