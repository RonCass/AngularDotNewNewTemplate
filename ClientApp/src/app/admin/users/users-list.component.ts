import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ToastrService } from '../../shared/services/toastr.service';
import { ApplicationUser } from '../../shared/models/models';
import { Sort } from '@angular/material/sort';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public isBusy = false;
  public pageIndex = 0;
  public pageLength = 1;
  public pageSize = 20;
  public dataUsers: ApplicationUser[] = [];
  public displayedColumns =
    ['companyName', 'firstName', 'lastName', 'userName', 'actions'];

  //Sorting And Filtering
  public sort = "-userName";
  public filterColumnName = "";
  public filterValue = ""
  public filterByList = [
    { filterColumnName: 'companyName', filterColumnValue: 'companyName' },
    { filterColumnName: 'firstName', filterColumnValue: 'firstName' },
    { filterColumnName: 'lastName', filterColumnValue: 'lastName' },
    { filterColumnName: 'userName', filterColumnValue: 'userName' }    
  ];

  constructor(private dataService: DataService, private toastrService: ToastrService, private modaldialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {

    this.dataService.getUsersPagedList(this.pageIndex, this.pageSize, this.sort, this.filterColumnName, this.filterValue)
      .subscribe(
        response => {
          this.dataUsers = response.listItems;
          this.pageLength = response.totalCount;         
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

  edit(element: any) {
    const dialogRef = this.modaldialog.open(UserModalComponent, {
      width: '1000px',
      data: { showTopBlueBox: false, updateRecord: element, applicationUserId: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.spinnerService.show();
      //this.isBusy = true;
      //this.getMyLines();
    },
      error => {
        //this.spinnerService.hide();
        //this.isBusy = false;
        //this.notificationService.notifyError("Error=" + error);
      });
  }
  
  //Filter and Sorting
  onFilter(filterByInfo) {
    this.filterColumnName = filterByInfo[0];
    this.filterValue = filterByInfo[1];
    //this.notificationService.notifySuccess(filterByInfo);
    this.getUsers();
  }

  onFilterReset() {
    this.pageIndex = 0;
    this.filterColumnName = "";
    this.filterValue = ""
    this.getUsers();
  }

  sortData(sort: Sort) {
    const data = this.dataUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.dataUsers = data;
      return;
    }

    //Reset Paging
    this.pageIndex = 0;

    const sortDirection = sort.direction === 'asc' ? "" : "-";
    this.sort = `${sortDirection}${sort.active}`;

    this.getUsers();

  }

}
