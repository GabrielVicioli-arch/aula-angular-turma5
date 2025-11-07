import { TestBed } from '@angular/core/testing';

import { DepartamentoService } from './departamento-services';

describe('DepartamentoServices', () => {
  let service: DepartamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
