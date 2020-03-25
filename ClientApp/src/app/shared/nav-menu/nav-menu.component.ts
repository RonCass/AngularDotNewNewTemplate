import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { ToastrService } from '../../shared/services/toastr.service';
import { Router } from '@angular/router';
import { ApplicationUser } from '../../shared/services/models';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isBusy = true;
  isExpanded = false;
  public myUser: ApplicationUser = new ApplicationUser();
  public isUserAuthenticated = false;

  constructor(private currentUserService: CurrentUserService, private toastrService: ToastrService, private router: Router) {

    currentUserService.$currentUserInfo.subscribe(appUser => {
      this.myUser = appUser;
    });        
  }

  ngOnInit() {
   
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    this.currentUserService.ClearAll();    
    this.router.navigate(['/login']);


}
}
