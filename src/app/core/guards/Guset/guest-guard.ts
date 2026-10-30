import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const _Router=inject(Router)
  if(localStorage.getItem('token')){
    return _Router.parseUrl('/feed')
  }else{
    return true
  }
};
