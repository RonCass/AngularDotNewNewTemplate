import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../core/services/current-user.service';
import { ToastrService } from '../../core/services/toastr.service';
import { Router } from '@angular/router';
import { ApplicationUser } from '../../core/services/models';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isBusy = true;
  isExpanded = false;
  myUser: ApplicationUser = new ApplicationUser();
  public isUserAuthenticated = false;

  constructor(private currentUserService: CurrentUserService, private toastrService: ToastrService, private router: Router) {

    // Hooked up this observable so the nav is responsive to login and out
    currentUserService.isLoggedIn.subscribe({
      next: (v) => {
          this.isUserAuthenticated = v;
      }
    });

    currentUserService.getAppUserObservable.subscribe({
      next: (v2) => {
          this.myUser = v2;
      }
    });
  }

  ngOnInit() {
    this.myUser = this.currentUserService.getLoggedInUserInfo();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    this.currentUserService.deleteUserToken();
    this.currentUserService.deleteApplicationUser();
    this.router.navigate(['/login']);


}
}
