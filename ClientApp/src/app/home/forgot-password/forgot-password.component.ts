import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { ToastrService } from '../../shared/services/toastr.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  myForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email])
  })
  
  public get emailFormControl() {
    return this.myForm.get("emailFormControl");
  }

  constructor(private dataService: DataService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    
  }

  submitEmailAddress() {
    //if(this.emailFormControl.value)
  }
}
