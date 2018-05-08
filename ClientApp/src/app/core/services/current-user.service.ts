import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { ApplicationUser } from './models';

import { Observable ,  Subject } from 'rxjs';
// import 'rxjs/Rx';

import * as moment from 'moment';

@Injectable()
export class CurrentUserService {

  userInfo;
  applicationUser: ApplicationUser = null;
  private userToken: string = null;
  private userIsAuthenticated = false;
  private userTokenExpiration: Date = null;

  myMomentDateTest: string = moment().format('LLLL');

  // change loggedIn to a subject
  private loggedIn: Subject<boolean> = new Subject<boolean>();
  private appUserObservable: Subject<ApplicationUser> = new Subject<ApplicationUser>();

  constructor(private router: Router) {
    this.initMethod();
  }

  // private ronTestSubject: Subject<boolean> = new Subject<boolean>();

  initMethod() {

  }

  // Create an observable that can be subscribed to in case it changes
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get getAppUserObservable() {
    return this.appUserObservable.asObservable();
  }

  isUserAuthenticated(): boolean {
    if (localStorage.getItem('userToken') && localStorage.getItem('applicationUser')) {

      const userToken = JSON.parse(localStorage.getItem('userToken'));

      // Check Expiration
      const now = moment.utc();
      const isAfter = moment(userToken.expiration).isAfter(now);

      // If token is expired, redirect to login
      if (!isAfter) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('applicationUser');
        this.deleteUserToken();
        this.deleteApplicationUser();
        this.loggedIn.next(false);
        return false;
      }

      this.loggedIn.next(true);
      return true;

    } else {
      this.loggedIn.next(false);
      return false;
      // this.router.navigate(['/login']);
    }

  }


  // TOKEN Stuff
  public setUserToken(myUserName: string, myToken: string, myExpiration: Date) {
    // Set the UserName and Token to the Local Storage
    localStorage.setItem('userToken', JSON.stringify({ username: myUserName, token: myToken, expiration: myExpiration }));
    this.userToken = myToken;
  }



  // Called from the Data Service
  public getUserToken() {
    // If local token is null, check local storage
    if (this.userToken === null) {
      if (localStorage.getItem('userToken')) {
        const myToken = JSON.parse(localStorage.getItem('userToken'));
        return myToken.token;
      } else {
        return this.userToken;
      }
    } else {
      return this.userToken;
    }
  }

  deleteUserToken() {
    localStorage.removeItem('userToken');
    this.loggedIn.next(false); // Set the isLoggedInFlag
    this.userToken = null;
  }



  // Application User Stuff
  public setLoggedInUserInfo(appUser: ApplicationUser) {
    // If there is a matchin item in Local Storage, delete it
    if (localStorage.getItem('applicationUser')) {
      this.deleteApplicationUser();
    }

    // Create the item in local storage
    localStorage.setItem('applicationUser', JSON.stringify(appUser));
    this.applicationUser = appUser;
    this.appUserObservable.next(appUser);
  }

  // Public method to get the application user
  public getLoggedInUserInfo(): ApplicationUser {

    if (this.applicationUser === null) {
      if (localStorage.getItem('applicationUser')) {
        const applicationUser = JSON.parse(localStorage.getItem('applicationUser'));
        this.setLoggedInUserInfo(applicationUser);
        return this.applicationUser;

      } else {
        return this.applicationUser;
      }
    } else {
      return this.applicationUser;
    }

  }

  deleteApplicationUser() {
    localStorage.removeItem('applicationUser');
    // this.loggedIn.next(false); //Set the isLoggedInFlag
    this.appUserObservable.next(null);
    this.applicationUser = null;
  }


  // setUserTokenExpiration(myTokenExpiration: Date) {
  //    this.userTokenExpiration = myTokenExpiration;
  // }

  // getUserTokenExpiration(): Date {
  //    //If local token is null, check local storage
  //    if (this.userTokenExpiration === null) {
  //        if (localStorage.getItem('userToken')) {
  //            var currentUser = JSON.parse(localStorage.getItem('userToken'));
  //            this.setUserTokenExpiration(currentUser.expiration);
  //            return this.userTokenExpiration;

  //        } else {
  //            return this.userTokenExpiration;
  //        }
  //    } else {
  //        return this.userTokenExpiration;
  //    }

  // }
}
