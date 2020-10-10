import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataServiceGenerated } from '../../shared/services/data.service.generated';
import { ToastrService } from '../../shared/services/toastr.service';
import * as _ from 'lodash';
import { validateBasis } from '@angular/flex-layout';
import { ApplicationUser } from '../../shared/models/models';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  public pageTitle = "User Modal";
  public userForm;
  public showForm = true;
  public userRoles;
  public applicationUser = new ApplicationUser;

  //Getters
  public get userName() {
    return this.userForm.get("userName");
  }
  public get firstName() {
    return this.userForm.get("firstName");
  }
  public get lastName() {
    return this.userForm.get("lastName");
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserModalComponent>,
    private dataService: DataService,
    private dataServiceGenerated: DataServiceGenerated,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    //If an edit, pull out roles and put in an array for the multi select dropdown
    if (this.data) {
      const myRoleArray = [];
      for (let role of this.data?.updateRecord?.applicationUserRoles) {
        myRoleArray.push(role.applicationRole);
      }

      this.userForm = new FormGroup({
        userName: new FormControl(this.data?.updateRecord?.userName, [Validators.required, Validators.email]),
        firstName: new FormControl(this.data?.updateRecord?.firstName, [Validators.required]),
        lastName: new FormControl(this.data?.updateRecord?.lastName, [Validators.required]),
        isActive: new FormControl(this.data?.updateRecord?.isActive),
        emailConfirmed: new FormControl(this.data?.updateRecord?.emailConfirmed),
        userRole: new FormControl(myRoleArray)

      });
    }
    else {
      //Create New User
      this.userForm = new FormGroup({
        userName: new FormControl("", [Validators.required, Validators.email]),
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        isActive: new FormControl(""),
        emailConfirmed: new FormControl(""),
        userRole: new FormControl("")

      });
    }

    

    //this.getUserRoles(this.data?.updateRecord?.applicationRoles[0]?.roleId);
    this.getUserRoles();
    
  }

  getUserRoles() {
    this.dataServiceGenerated.ApplicationUsersGetRoles()
      .subscribe(
        response => {
          this.userRoles = response;

          //const myUserRole = _.find(response, function (o) { return o.id == myRoleId });
          //const myUserRoleArray = [];
          //myUserRoleArray.push(myUserRole);

          //this.userForm.patchValue({
          //  userRole: [myUserRole]
          //})
        },
        error => {
          //this.spinnerService.hide();
          //this.isBusy = false;
          this.toastrService.error("Error=" + error);
        }
      );
  }

  save() {

    //Touch all controls to trigger validation
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    //Confirm form is valid
    if (!this.userForm.valid) {
      this.toastrService.error("Form is not valid");     
      return false;
    }

    //If new, create a new user object
    if (!this.data) {
      this.data = {};
      this.data.updateRecord = new ApplicationUser();
    }
    //this.applicationUser.id = this.userForm.get(this.data.updateRecord.id);
    //this.applicationUser.userTok

    this.data.updateRecord.userName = this.userForm.get("userName").value;
    this.data.updateRecord.firstName = this.userForm.get("firstName").value;
    this.data.updateRecord.lastName = this.userForm.get("lastName").value;
    this.data.updateRecord.isActive = this.userForm.get("isActive").value;
    this.data.updateRecord.emailConfirmed = this.userForm.get("emailConfirmed").value;

    //Clear all current roles so we can add the selected ones below
    this.data.updateRecord.applicationUserRoles = [];

    for (const role of this.userForm.get("userRole").value) {
      this.data.updateRecord.applicationUserRoles.push({ applicationRole: role });
    }

    if (this.data.updateRecord.id) {
      //Save Updated Record
      this.dataService.updateUser(this.data.updateRecord)
        .subscribe(
          response => {
            this.dialogRef.close(this.data.updateRecord);
            //this.spinnerService.hide();
            //this.isBusy = false;
          },
          error => {
            //this.spinnerService.hide();
            //this.isBusy = false;
            this.toastrService.error("Error=" + error);
          }
        );
    }
    else {

      //Save New Record
      this.dataService.createUser(this.data.updateRecord)
        .subscribe(
          response => {
            this.dialogRef.close(response);
            //this.spinnerService.hide();
            //this.isBusy = false;
          },
          error => {
            //this.spinnerService.hide();
            //this.isBusy = false;
            this.toastrService.error("Error=" + error);
          }
        );
    }
    //this.isBusy = false; //Turn off busy spinner

  }

  compare(object1: any, object2: any) {
    return (
      object1 &&
      object2 &&
      object1.id === object2.id
    );
  }
}
