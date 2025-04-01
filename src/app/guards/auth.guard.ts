import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router=inject(Router)
  if(sessionStorage.getItem("token")){
    // authorized 
    return true
  }else{
    // not authorized
    alert("Unauthorized .. Please Login")
    router.navigateByUrl("/login")
    return false
  }

};
