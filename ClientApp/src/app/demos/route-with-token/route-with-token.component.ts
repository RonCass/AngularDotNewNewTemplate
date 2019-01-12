import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-route-with-token',
  templateUrl: './route-with-token.component.html',
  styleUrls: ['./route-with-token.component.css']
})
export class RouteWithTokenComponent implements OnInit {

   myToken: string;

   constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.myToken = this.route.snapshot.paramMap.get('token');
  }

  goBack() {
    this.router.navigate(['/demos/routingExamples']);
  }
}
