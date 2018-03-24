import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';

import { CurrentUserService } from './current-user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private currentUserService: CurrentUserService) { }



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        //The call to isUserAuthenitcated will redirect to login if they are not authenticated
        if (this.currentUserService.isUserAuthenticated()) {
            // logged in so return true
            return true;
        } else {
            this.router.navigate(['/login']);
        }
       
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

   
}
