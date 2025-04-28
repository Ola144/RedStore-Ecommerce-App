import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { redStoreCanActiveChildrenGuard } from './red-store-can-active-children.guard';

describe('redStoreCanActiveChildrenGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redStoreCanActiveChildrenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
