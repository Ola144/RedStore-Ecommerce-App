import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { MasterService } from '../service/master.service';

export const redStoreCanActiveChildrenGuard: CanActivateChildFn = (childRoute, state) => {
  const masterSerivce = inject(MasterService);
    const router = inject(Router);
    if (masterSerivce.localUser) {
      return true;
    } else {
      router.navigateByUrl('/account');
      return false;
    }
  return true;
};
