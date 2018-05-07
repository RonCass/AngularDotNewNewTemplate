import { Component, OnInit } from '@angular/core';

import { ToastrService } from './../../core/services/toastr.service';
@Component({
  selector: 'app-toast-test',
  templateUrl: './toast-test.component.html',
  styleUrls: ['./toast-test.component.css']
})
export class ToastTestComponent implements OnInit {

  constructor(private toast: ToastrService) { }

  ngOnInit() {

  }

  doSuccessToast() {
    this.toast.success("Success Works");
  }

  doInfoToast() {
    this.toast.info("Info Works");
  }

  doWarningToast() {
    this.toast.warning("Warning Works");
  }

  doErrorToast() {
    this.toast.error("Error Works");
  }

  doErrorToastWithTitle() {
    this.toast.error('I do not think that word means what you think it means.', 'Inconceivable!');
  }

  doErrorLogOnToast() {
    this.toast.errorLongOn("Error Long On Works");
  }
}
