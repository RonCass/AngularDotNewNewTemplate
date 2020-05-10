import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';
import { ToastrService } from '../../../shared/services/toastr.service';
import { ApplicationUser } from '../../../shared/services/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reactive-form-example',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.css']
})
export class ReactiveFormExampleComponent implements OnInit {

  public isBusy = false; //Used for spinners or loading icons

  //Help Text Fields
  public showHelpfirstname;
  public showHelplastName;
  public showHelpemail;
  public showHelppassword;

  public appUserForm; //Main App User Form
  public applicationUserModel = new ApplicationUser(); //Model for sending to API
  public userRoles; //ApplicationUserRoles to select from - AspNetRoles
  public applicationUserId; //Application User Id sent in url/route param

  //Getters for form validation
  public get email() { return this.appUserForm.get('email'); } //Used By Form - <mat-error *ngIf="email.invalid">{{getEmailErrorMessage()}}</mat-error>
  public get firstName() { return this.appUserForm.get('firstName'); } //Used By Form - <mat-error *ngIf="firstName.hasError">Required Field</mat-error>
  public get lastName() { return this.appUserForm.get('lastName'); }
  public get userRole() { return this.appUserForm.get('userRole'); }
  public get password() { return this.appUserForm.get('password'); }

  constructor(private dataService: DataService, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.appUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      companyName: new FormControl(),      
      phoneNumber: new FormControl(),
      isActive: new FormControl(true),
      emailConfirmed: new FormControl('0'),
      userRole: new FormControl()
    });

    //Get the Roles for the dropdown select
    this.getRoles();

    this.route.params.subscribe(routeParams => {
       this.applicationUserId = (routeParams["applicationUserId"]);

      if (this.applicationUserId !== "0") {
        this.getApplicationUser(this.applicationUserId);
      }
    })

  }

  getApplicationUser(myAppUserId) {

    this.dataService.getUserById(myAppUserId)
      .subscribe(
        response => {
          this.applicationUserModel = response;
          this.isBusy = false;

          //Patch the values in to the form
          this.appUserForm.patchValue({
            email: response?.email,
            firstName: response?.firstName,
            lastName: response?.firstName,
            companyName: response?.companyName,
            phoneNumber: response?.phoneNumber,
            isActive: response?.isActive,
            emailConfirmed: response?.emailConfirmed,
            userRole: response?.userRole
          })
        },
        error => {
          this.toastrService.error(error);
          this.isBusy = false;
        });

  }

  getRoles() {
    this.isBusy = true;

    this.dataService.getRoles()
      .subscribe(
        response => {
          this.userRoles = response;
          this.isBusy = false;
        },
        error => {
          this.toastrService.error(error);
          this.isBusy = false;
        });
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  //User selected a role from the dropdown/select
  userRoleChanged(event) {

  }

  //User Role - Sets selected value on edit
  compareUserRole(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  //Save User - Add/Edit
  save() {

    //Touch all controls to trigger validation
    Object.keys(this.appUserForm.controls).forEach(field => {
      const control = this.appUserForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (!this.appUserForm.valid) {
      this.toastrService.error("Form is not valid");      
      return false;
    }

    //Populate Angular Model for sending to API
    this.applicationUserModel.email = this.email.value; //Get value from getters
    this.applicationUserModel.password = this.password.value; //Get value from getters
    this.applicationUserModel.firstName = this.firstName.value; //Get value from getters
    this.applicationUserModel.lastName = this.lastName.value; //Get value from getters
    this.applicationUserModel.companyName = this.appUserForm.get('companyName').value; //Get value from form itself
    this.applicationUserModel.phoneNumber = this.appUserForm.get('phoneNumber').value; //Get value from form itself
    this.applicationUserModel.isActive = this.appUserForm.get('isActive').value; //Get value from form itself    
    this.applicationUserModel.roleName = this.appUserForm.get('userRole').value;

    //Need to change value sent back to API as either true or false
    if (this.appUserForm.get('emailConfirmed').value == "1") {
      this.applicationUserModel.emailConfirmed = true; //Get value from form itself
    } else {
      this.applicationUserModel.emailConfirmed = false; //Get value from form itself
    }
    

    //If there is an Application User Id, do an update, not create
    if (this.applicationUserModel.id) {

      //Do Update
      //this.dataService.updateApplicationUser(this.applicationUserModel)
      //  .subscribe(
      //    data => {
      //      this.notificationService.notifySuccess("Item has been updated successfully");
      //      this.tenantLegalInfo.tenantLegalInfoId = data["tenantLegalInfoId"];
      //      this.tenantLegalInfoFormIsValid = true;
      //      this.isBusy = false; //Turn off busy spinner

      //      //Forward if variable is set
      //      if (forwardToAfterSave) {
      //        this.leftNavClick(forwardToAfterSave);
      //      }
      //      else {
      //        if (saveThenContinue) {
      //          this.leftNavClick("frequencyTechnologyInfo");
      //        }
      //      }
      //    },
      //    error => {
      //      this.tenantLegalInfoFormIsValid = false;
      //      this.isBusy = false; //Turn off busy spinner
      //      this.notificationService.notifyError("Error=" + error);
      //    }
      //  );

    }
    else {

      this.dataService.createUser(this.applicationUserModel)
        .subscribe(
          data => {
            this.toastrService.success("Item has been saved successfully");
            this.applicationUserModel.id = data["id"];            
            this.isBusy = false; //Turn off busy spinner            
          },
          error => {            
            this.isBusy = false; //Turn off busy spinner
            this.toastrService.error("Error = " + error);
          }
        );

    }

  }
}
