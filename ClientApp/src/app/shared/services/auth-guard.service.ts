import { Injectable } from '@angular/core';
import {
    CanActivate, Router, Route,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild, CanLoad
} from '@angular/router';

import { CurrentUserService } from './current-user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private router: Router, private currentUserService: CurrentUserService) { }

    // 4-15-2018 Saw Angular Routing Video by Deborah K. CanLoad prevents the module from even being loaded if they are not authorized.
    // So not sure why I would use CanAcivate
    canLoad(route: Route): boolean {
        return this.checkLoggedIn(route.path);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // The call to isUserAuthenitcated will redirect to login if they are not authenticated
        return this.checkLoggedIn(state.url);

        // if (this.currentUserService.isUserAuthenticated()) {
        //     // logged in so return true
        //     return true;
        // } else {
        //     this.router.navigate(['/login']);
        // }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLoggedIn(url: string): boolean {
        if (this.currentUserService.isUserAuthenticated()) {
            // logged in so return true
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}
