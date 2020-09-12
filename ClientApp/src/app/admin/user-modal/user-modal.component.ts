import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  public pageTitle = "User Modal";
  public userForm;
  public showForm = true;

  //Getters
  
  public get firstName() {
    return this.userForm.get("firstName");
  }
  public get lastName() {
    return this.userForm.get("lastName");
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserModalComponent>
  ) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      
      firstName: new FormControl(this.data?.updateRecord?.firstName),
      lastName: new FormControl(this.data?.updateRecord?.lastName, [Validators.required]),
      //streetAddress1: new FormControl(this.data?.applicationContact?.contact?.streetAddress1, [Validators.required]),
      //streetAddress2: new FormControl(this.data?.applicationContact?.contact?.streetAddress2),
      //city: new FormControl(this.data?.applicationContact?.contact?.city),
      //stateId: new FormControl(this.data?.applicationContact?.contact?.state?.stateId),
      //postalCode: new FormControl(this.data?.applicationContact?.contact?.postalCode),
      //phoneNumber1: new FormControl(this.data?.applicationContact?.contact?.phoneNumber1),
      //phoneNumber2: new FormControl(this.data?.applicationContact?.contact?.phoneNumber2),
      //emailAddress1: new FormControl(this.data?.applicationContact?.contact?.emailAddress1, [Validators.email]),
      //emailAddress2: new FormControl(this.data?.applicationContact?.contact?.emailAddress2, [Validators.email]),
    });

  }

  save() {

  }
}
