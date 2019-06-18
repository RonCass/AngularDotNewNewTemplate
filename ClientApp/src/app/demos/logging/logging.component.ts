import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ToastrService } from '../../core/services/toastr.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  public isBusy = false;
  public currentLoggingLevel;
  public selectedLevel = '';

  //Pagination
  public currentPage: number = 1;
  public pageSize: number = 10;
  public previousPageButton = 'disabled';
  public totalPages: number = 1;
  public total: number;

  public sortColumn: string = 'TimeStamp';
  public sortDirection: string = '';

  public dataLogs;

  constructor(private dataService: DataService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getData();
  }

  getCurrentLoggingLevel() {

    this.isBusy = true;
    this.dataService.getLoggingLevel()
      .subscribe(
        response => {
          this.currentLoggingLevel = response.minimumLoggingLevel
          this.isBusy = false;
        },
        error => {
          this.toastrService.error(error);
          this.isBusy = false;
        })
  }

  changeLoggingLevel() {
    if (this.selectedLevel === '0') {
      return;
    }

    this.isBusy = true;
    this.dataService.changeLoggingLevel(this.selectedLevel)
      .subscribe(
        response => {
          this.toastrService.success("New Logging Level Was Saved Successfully");
          this.currentLoggingLevel = this.selectedLevel;
          this.isBusy = false;
        },
        error => {
          this.toastrService.error(error);
          this.isBusy = false;
        })
  }

  getData() {

    this.isBusy = true;
    var selectedUser = ''; //FUTURE USE

    this.dataService.getLogs(this.currentPage, this.pageSize, this.sortDirection + this.sortColumn, '', selectedUser, this.selectedLevel)
      .subscribe(
        response => {
          this.dataLogs = response.data;
          this.total = response.totalCount;
          this.totalPages = response.totalPages;
          this.isBusy = false;
        },
        error => {
          this.toastrService.error(error);
          this.isBusy = false;
        })
  }

  levelSelected(myEvent) {
    if (myEvent === '0') {
      //Clear User
      this.selectedLevel = '';
    }

    this.getData();
  }

  // Paging Events 
  pageChangeEvent(newPageNumber: number) {
    this.currentPage = newPageNumber;
    this.getData();
  }

  pageSizeChangedEvent(newPageSize: number) {
    // Always change to page 1 when changing page size
    this.currentPage = 1;
    this.pageSize = newPageSize;
    this.getData();
  }

  // Column Sorting Events 
  public sortedColumnElement = '';

  sortColumnEvent(columnDataElementName: string) {

    if (columnDataElementName !== this.sortColumn) {
      this.sortColumn = columnDataElementName;
      this.sortDirection = '';
    } else {
      this.sortDirection = this.sortDirection === '' ? '-' : '';
    }
    this.currentPage = 1;
    this.sortedColumnElement = columnDataElementName; // Used to show or hide sort arrows
    this.getData();
  }

}
