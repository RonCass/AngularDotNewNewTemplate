import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ToastrService } from '../../shared/services/toastr.service';
import { ApplicationUser } from '../../shared/models/models';
import { Sort } from '@angular/material/sort';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceGenerated } from '../../shared/services/data.service.generated';
import * as _ from 'lodash';

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
    ['id', 'companyName', 'firstName', 'lastName', 'userName', 'roles', 'isActive', 'emailConfirmed', 'actions'];

  //Sorting And Filtering
  public sort = "-userName";
  public filterColumnName = "";
  public filterValue = ""
  public filterByList = [
    { filterColumnName: 'Company Name', filterColumnValue: 'companyName' },
    { filterColumnName: 'First Name', filterColumnValue: 'firstName' },
    { filterColumnName: 'Last Name', filterColumnValue: 'lastName' },
    { filterColumnName: 'User Name', filterColumnValue: 'userName' }    
  ];

  constructor(private dataService: DataService, private dataServiceGenerated: DataServiceGenerated, private toastrService: ToastrService, private modaldialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }
  

  setIsActive(applicationUserId, isActive) {
    this.dataServiceGenerated.ApplicationUsersSetApplicationUserIsActive(applicationUserId, isActive)
      .subscribe(
        response => {
          //Set the value to the item in the users data so the checkbox changes in the UI
          _.find(this.dataUsers, function (o) { return o.id == applicationUserId }).isActive = isActive;
         this.toastrService.success("User was updated.")
        },
        error => {
          //this.spinnerService.hide();
          //this.isBusy = false;
          this.toastrService.error("Error=" + error);
        }
      );
  }

  setEmailConfirmed(applicationUserId, emailConfirmed) {
    this.dataServiceGenerated.ApplicationUsersSetApplicationUserEmailConfirmed(applicationUserId, emailConfirmed)
      .subscribe(
        response => {
          //Set the value to the item in the users data so the checkbox changes in the UI
          _.find(this.dataUsers, function (o) { return o.id == applicationUserId }).emailConfirmed = emailConfirmed;
          this.toastrService.success("User was updated.")
        },
        error => {
          //this.spinnerService.hide();
          //this.isBusy = false;
          this.toastrService.error("Error=" + error);
        }
      );
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

  //getUserRolesForTableColumnDisplay(element) {

  //  const myRoleArray = [];
  //  for (let myApplicationRole of element.applicationRoles) {
  //    myRoleArray.push(myApplicationRole.roleName);
  //  }
  //  return myRoleArray.sort().join();
  //}

  create() {
    const dialogRef = this.modaldialog.open(UserModalComponent, {
      width: '1000px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== "" && result !== undefined) {
        //Add the edited user to the list
        //Table was not updating so I had to make a copy etc.
        const dataUsersCopy = this.dataUsers.slice();
        dataUsersCopy.push(result);
        this.dataUsers = dataUsersCopy.slice();
      }

    });
  }

  edit(element: any) {
    const dialogRef = this.modaldialog.open(UserModalComponent, {
      width: '1000px',
      data: { updateRecord: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== "" && result !== undefined) {

        //Remove the current version of the user from the list
        _.remove(this.dataUsers, function (o) { return o.id == result.id });

        //Add the edited user to the list
        this.dataUsers.push(result);


      }
      
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

  //Paging
  loadPage(event) {
    this.pageIndex = event.pageIndex;
    this.getUsers();
  }

}
