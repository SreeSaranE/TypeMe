import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { Service } from '../service/service';

export const authGuard: CanActivateFn = (
  route,
  state
) => {
  const router: Router = inject(Router);
  const service = inject(Service);

  if(!service.isLoggedIn()){
    router.navigate(['/login']);
    return false;
  }
  return true;
};