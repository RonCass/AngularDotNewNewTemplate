import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { ApplicationUser } from '../../shared/models/models';

@Component({
  selector: 'app-auth-example',
  templateUrl: './auth-example-main.component.html',
  styleUrls: ['./auth-example-main.component.css']
})
export class AuthExampleMainComponent implements OnInit {

  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit() {

   
  }

}
