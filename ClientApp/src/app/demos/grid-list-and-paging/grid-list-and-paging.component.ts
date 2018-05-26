import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ToastrService } from '../../core/services/toastr.service';

@Component({
  selector: 'app-grid-list-and-paging',
  templateUrl: './grid-list-and-paging.component.html',
  styleUrls: ['./grid-list-and-paging.component.css']
})
export class GridListAndPagingComponent implements OnInit {
  public gridData;

  // Pagination
  pageNumber = 1;
  pageSize = 20;
  previousPageButton = 'disabled';
  totalPages = 1;
  total: number;

  isBusy = false;

  sortDirection = '';
  sortColumn = 'col1';

  constructor(
    private dataService: DataService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getDummyData();
  }

  getDummyData() {
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

  onSortOrderChange(columnName) {
    if (columnName !== this.sortColumn) {
      this.sortColumn = columnName;
      this.sortDirection = '';
    } else {
      this.sortDirection = this.sortDirection === '' ? '-' : '';
    }
    this.pageNumber = 1;

    this.getDummyData();
  }

  changePageSize(pageSize) {
    this.pageSize = pageSize;
    // Always change to page 1 when changing page size
    this.pageNumber = 1;
    this.getDummyData();
  }

  goToPreviousPage() {
    // If First Page, do nothing
    if (this.pageNumber === 1) {
      return;
    }
    this.pageNumber--;
    this.getDummyData();
  }

  goToNextPage() {
    // If Last Page, do nothing
    if (this.pageNumber === this.totalPages) {
      return;
    }
    this.pageNumber++;
    this.getDummyData();
  }
}
