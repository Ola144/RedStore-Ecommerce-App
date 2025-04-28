import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redStoreGuard } from './red-store.guard';

describe('redStoreGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redStoreGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
