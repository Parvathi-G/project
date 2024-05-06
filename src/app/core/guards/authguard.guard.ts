import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn,Router, RouterStateSnapshot } from '@angular/router';



export const authguardGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const token=typeof localStorage !=='undefined'?localStorage.getItem('loggedUser'):null
 
  
  if(token){
    return true
  }
  else{
    router.navigateByUrl('login')
    return false
  }
  
  
};


 