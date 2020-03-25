import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../shared/services/current-user.service';

@Component({
  selector: 'app-protected-route',
  templateUrl: './protected-route.component.html',
  styleUrls: ['./protected-route.component.css']
})
export class ProtectedRouteComponent implements OnInit {

  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit() {
  }

}
