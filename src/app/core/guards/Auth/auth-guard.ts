import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      // return false
      // lw 3amlt return false w ma3mltsh path yro7lo lw katbt /feed mesh hayro7 bs haytl3 saf7a beda
      return _Router.parseUrl('/login');
    }
  }else{
    return true;
  }
};
