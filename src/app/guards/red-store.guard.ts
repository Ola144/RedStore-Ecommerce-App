import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MasterService } from '../service/master.service';

export const redStoreGuard: CanActivateFn = (route, state) => {
  const masterSerivce = inject(MasterService);
  const router = inject(Router);
  if (masterSerivce.localUser) {
    router.navigateByUrl('/dashboard');
    return true;
  } else {
    router.navigateByUrl('/account');
    return false;
  }
};
