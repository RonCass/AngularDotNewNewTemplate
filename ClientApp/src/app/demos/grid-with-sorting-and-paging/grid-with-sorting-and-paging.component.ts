import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ToastrService } from '../../shared/services/toastr.service';
import { Observable ,  Subject } from 'rxjs';

@Component({
  selector: 'app-grid-with-sorting-and-paging',
  templateUrl: './grid-with-sorting-and-paging.component.html',
  styleUrls: ['./grid-with-sorting-and-paging.component.css']
})
export class GridWithSortingAndPagingComponent implements OnInit {

  public gridData;
   // Pagination
   public pageNumber = 1;
   public pageSize = 20;
   public previousPageButton = 'disabled';
   public totalPages = 1;
   public total: number;
   // public currentPage = 1;

  // Sorting
  public sortDirection = '-';
  public sortColumn = 'id';

  public isBusy = false;


  constructor(
    private dataService: DataService,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {

    this.getData();


  }

  getData() {

    this.dataService
    .getDummyData(this.pageNumber, this.pageSize, (this.sortDirection + this.sortColumn))
    .subscribe(
      response => {
        this.gridData = response.items;
        this.total = response.totalCount;
        this.totalPages = response.totalPages;
        this.isBusy = false;
      },
      error => {
        this.toastrService.error(error);
        this.isBusy = false;
      }
    );
  }

  // Paging Events
  // Event Emitted from child
  pageChangeEvent(newPageNumber: number) {
    this.pageNumber = newPageNumber;
    this.getData();
  }

  pageSizeChangedEvent(newPageSize: number) {
    // Always change to page 1 when changing page size
    this.pageNumber = 1;
    this.pageSize = newPageSize;
    this.getData();
  }

  // Column Sorting Events
  // Event Emitted from child
  public sortedColumnElement = '';

  sortColumnEvent(columnDataElementName: string) {

    if (columnDataElementName !== this.sortColumn) {
      this.sortColumn = columnDataElementName;
      this.sortDirection = '';
    } else {
      this.sortDirection = this.sortDirection === '' ? '-' : '';
    }
    this.pageNumber = 1;
    this.sortedColumnElement = columnDataElementName; // Used to show or hide sort arrows
    this.getData();
  }
}
