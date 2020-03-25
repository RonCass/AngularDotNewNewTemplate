var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '../../shared/services/toastr.service';
import { DataService } from '../../shared/services/data.service';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { ApplicationUser } from '../../shared/services/models';
var LoginComponent = (function () {
    function LoginComponent(_dataService, toastrService, currentUserService, router) {
        this._dataService = _dataService;
        this.toastrService = toastrService;
        this.currentUserService = currentUserService;
        this.router = router;
        this.applicationUser = new ApplicationUser();
        this.isBusy = false;
    }
    ;
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.userName === '') {
            this.toastrService.error('Username is required.');
            return;
        }
        if (this.userName === '') {
            this.toastrService.error('Password is required.');
            return;
        }
        this.isBusy = true;
        this._dataService.createToken(this.userName, this.password)
            .subscribe(function (response) {
            localStorage.setItem('userToken', JSON.stringify({ username: _this.userName, token: response.token, expiration: response.expiration }));
            _this.currentUserService.setUserToken(_this.userName, response.token, response.expiration);
            _this.applicationUser.id = response.user.id;
            _this.applicationUser.firstName = response.user.firstName;
            _this.applicationUser.lastName = response.user.lastName;
            _this.applicationUser.companyId = response.user.companyId;
            _this.applicationUser.email = response.user.email;
            _this.currentUserService.setLoggedInUserInfo(_this.applicationUser);
            _this.currentUserService.isUserAuthenticated();
            _this.isBusy = false;
            _this.router.navigate(['/home']);
        }, function (error) {
            _this.toastrService.error(error);
            _this.isBusy = false;
        });
    };
    LoginComponent = __decorate([
        Component({
            selector: 'login',
            templateUrl: 'login.component.html'
        }),
        __metadata("design:paramtypes", [DataService, ToastrService, CurrentUserService, Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map