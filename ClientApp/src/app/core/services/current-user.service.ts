import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { ApplicationUser } from './models';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import * as moment from 'moment';


@Injectable()
export class CurrentUserService {

    userInfo;
    applicationUser: ApplicationUser = null;
    private userToken: string = null;
    private userIsAuthenticated = false;
    private userTokenExpiration: Date = null;

    myMomentDateTest: string = moment().format('LLLL');

    // Make loggedIn a subject
    private loggedIn: Subject<boolean> = new Subject<boolean>();

    constructor(private router: Router) {
        this.initMethod();
    }

    initMethod() {

    }

    //Create an observable that can be subscribed to in case it changes
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    isUserAuthenticated(): boolean {
        if (localStorage.getItem('userToken') && localStorage.getItem('applicationUser')) {

            var userToken = JSON.parse(localStorage.getItem('userToken'));

            //Check Expiration
            var now = moment.utc();
            var isAfter = moment(userToken.expiration).isAfter(now);

            //If token is expired, redirect to login
            if (!isAfter) {
                localStorage.removeItem('userToken');
                localStorage.removeItem('applicationUser');
                this.deleteUserToken();
                this.deleteApplicationUser();
                this.loggedIn.next(false); //Set the isLoggedInFlag
                return false;
            }

            this.loggedIn.next(true); //Set the isLoggedInFlag
            return true;

        } else {
            this.loggedIn.next(false); //Set the isLoggedInFlag
            return false;
            //this.router.navigate(['/login']);
        }

    }

    // Public method to get the application user
    public getLoggedInUserInfo(): ApplicationUser {

        if (this.applicationUser === null) {
            if (localStorage.getItem('applicationUser')) {
                var applicationUser = JSON.parse(localStorage.getItem('applicationUser'));
                this.setLoggedInUserInfo(applicationUser);
                return this.applicationUser;

            } else {
                return this.applicationUser;
            }
        } else {
            return this.applicationUser;
        }
      
    }

    public setLoggedInUserInfo(appUser: ApplicationUser) {

        this.applicationUser = appUser;
    }

    setUserToken(myToken: string) {
        this.userToken = myToken;
    }

    setUserTokenExpiration(myTokenExpiration: Date) {
        this.userTokenExpiration = myTokenExpiration;
    }

    getUserToken(): string {
        //If local token is null, check local storage
        if (this.userToken === null) {
            if (localStorage.getItem('userToken')) {
                var currentUser = JSON.parse(localStorage.getItem('userToken'));
                this.setUserToken(currentUser.token);
                return this.userToken;

            } else {
                return this.userToken;
            }
        } else {
            return this.userToken;
        }

    }

    getUserTokenExpiration(): Date {
        //If local token is null, check local storage
        if (this.userTokenExpiration === null) {
            if (localStorage.getItem('userToken')) {
                var currentUser = JSON.parse(localStorage.getItem('userToken'));
                this.setUserTokenExpiration(currentUser.expiration);
                return this.userTokenExpiration;

            } else {
                return this.userTokenExpiration;
            }
        } else {
            return this.userTokenExpiration;
        }

    }

    deleteUserToken() {
        this.loggedIn.next(false); //Set the isLoggedInFlag
        this.userToken = null;
    }

    deleteApplicationUser() {
        this.loggedIn.next(false); //Set the isLoggedInFlag
        this.applicationUser = null;
    }

    
   






}