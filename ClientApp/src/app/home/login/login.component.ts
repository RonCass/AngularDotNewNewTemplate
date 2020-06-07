import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '../../shared/services/toastr.service';
import { DataService } from '../../shared/services/data.service';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { ApplicationUser } from '../../shared/models/models';


@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    userName: string = 'admin@mywebsite.com';
    password: string = 'SomePassword1!';
    applicationUser: ApplicationUser = new ApplicationUser();
    isBusy = false;
    public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

    constructor(private _dataService: DataService, private toastrService: ToastrService,
       private currentUserService: CurrentUserService, private router: Router) { }

       ngOnInit() {

          this.myFocusTriggeringEventEmitter.emit(true); // Set focus to Username Field
      }
    login() {

        // Validate they entered a username
        if (this.userName === '') {
            this.toastrService.error('Username is required.');
            return;
        }

        // Validate they entered a password
        if (this.userName === '') {
            this.toastrService.error('Password is required.');
            return;
        }

        this.isBusy = true;

        // Create the token
        this._dataService.createToken(this.userName, this.password)
            .subscribe(
            response => {
                
                //Set Token Information
                this.currentUserService.setUserToken(response.token, response.expiration);               

                // Set Application User Info
                this.applicationUser.id = response.user.id;
                this.applicationUser.firstName = response.user.firstName;
                this.applicationUser.lastName = response.user.lastName;
                this.applicationUser.companyId = response.user.companyId;
                this.applicationUser.email = response.user.email;
                this.applicationUser.roleName = response.user.roleName;
                // Set the info back to the service to be used throughout the site
                this.currentUserService.setCurrentUserInfo(this.applicationUser);
                // Set the ApplicationUser to the Local Storage
                // localStorage.setItem('applicationUser', JSON.stringify(this.applicationUser));

                // Weird issue where the first time through it doesnt set something, so trying to put this in to see if this fixes it
                this.currentUserService.isUserAuthenticated();

                this.isBusy = false;
                this.router.navigate(['/home']);
            },
            error => {
                this.toastrService.error('Username or password are incorrect. Please try again.');
                this.isBusy = false;
            }
            );
    }
}
