import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApplicationUser, TokenInfo } from '../models/models';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
// import 'rxjs/Rx';

import * as moment from 'moment';

@Injectable()
export class CurrentUserService {
   
  //Observables that can be subscribed to
  public $currentUserInfo: BehaviorSubject<ApplicationUser> = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem('applicationUser')));
  public $tokenInfo: BehaviorSubject<TokenInfo> = new BehaviorSubject<TokenInfo>(JSON.parse(localStorage.getItem('userToken')));

  //Static vars that can be called when you just need the info on a specific page etc. and dont need to subscribe to changes in that information
  public currentUserInfo: ApplicationUser;
  public tokenInfo: TokenInfo;


  constructor(private router: Router) {
    this.initMethod();
  }

  initMethod() {

  }

  // TOKEN STUFF
  public setUserToken(myToken: string, myTokenExpiration: string) {

    // If there is a matchin item in Local Storage, delete it
    if (localStorage.getItem('userToken')) {
      localStorage.removeItem('userToken');
    }

    localStorage.setItem('userToken', JSON.stringify({ token: myToken, expiration: myTokenExpiration }));
    let myTokenInfo = new TokenInfo();
    myTokenInfo.token = myToken;
    myTokenInfo.expiration = myTokenExpiration;

    this.$tokenInfo.next(myTokenInfo);
    this.tokenInfo = myTokenInfo;
  }

  public getTokenInfo(): TokenInfo {

    if (this.tokenInfo === null || this.tokenInfo === undefined) {
      if (localStorage.getItem('userToken')) {
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        this.tokenInfo = userToken;
        return this.tokenInfo;

      } else {
        return this.tokenInfo;
      }
    } else {
      return this.tokenInfo;
    }
  }

  //USER STUFF
  public setCurrentUserInfo(appUser: ApplicationUser) {
    // If there is a matchin item in Local Storage, delete it
    if (localStorage.getItem('applicationUser')) {
      localStorage.removeItem('applicationUser');
    }

    // Create the item in local storage
    localStorage.setItem('applicationUser', JSON.stringify(appUser));
    this.$currentUserInfo.next(appUser);
    this.currentUserInfo = appUser;   
  }

  // Public method to get the application user
  public getLoggedInUserInfo(): ApplicationUser {

    if (this.currentUserInfo === null || this.currentUserInfo === undefined) {
      if (localStorage.getItem('applicationUser')) {
        const applicationUser = JSON.parse(localStorage.getItem('applicationUser'));
        this.currentUserInfo = applicationUser;
        return this.currentUserInfo;

      } else {
        return this.currentUserInfo;
      }
    } else {
      return this.currentUserInfo;
    }
  }

  isUserAuthenticated(): boolean {
    if (localStorage.getItem('userToken') && localStorage.getItem('applicationUser')) {

      // Check Expiration
      const userToken = JSON.parse(localStorage.getItem('userToken'));
      const now = moment.utc();
      const isAfter = moment(userToken.expiration).isAfter(now);

      // If token is expired, redirect to login
      if (!isAfter) {
        this.ClearAll();
        return false;
      } else {
        return true;
      }

    } else {
      this.ClearAll();      
      return false;      
    }
  }

  ClearAll() {
    //Clear Local Storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('applicationUser');

    //Clear Token Info
    this.$tokenInfo.next(new TokenInfo());
    this.tokenInfo = new TokenInfo();

    //Clear Application User Info
    this.$currentUserInfo.next(new ApplicationUser());
    this.currentUserInfo = new ApplicationUser();
  }


}
