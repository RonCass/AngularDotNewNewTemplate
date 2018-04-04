import { Component, OnInit } from '@angular/core';

import { DataService } from '../../core/services/data.service';
import { Log } from '../../core/services/models';


@Component({
  selector: 'app-view-logs',
  templateUrl: './view-logs.component.html',
  //styleUrls: ['./view-logs.component.css']
})
export class ViewLogsComponent implements OnInit {

  
  myLog: Log;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getLogs();
  }

  getLogs() {

    this.dataService.getLogs()
      .subscribe(data => this.myLog);

  }

}
