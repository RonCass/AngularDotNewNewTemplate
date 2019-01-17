import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-paging',
  templateUrl: './grid-paging.component.html',
  styleUrls: ['./grid-paging.component.css']
})
export class GridPagingComponent implements OnInit {

  @Input() pageNumber = 1;
  @Input() pageSize: number;
  @Input() previousPageButton: string;
  @Input() totalPages: number;
  @Input() total: number;
  @Output() pageChangedEvent = new EventEmitter<number>();
  @Output() pageSizeChangedEvent = new EventEmitter<number>();

  // public currentPage = 1;

  constructor() { }

  ngOnInit() {
  }

  changePageSize(pageSize) {
    this.pageSize = pageSize;
    // Always change to page 1 when changing page size
    this.pageNumber = 1;
    this.pageSizeChangedEvent.emit(this.pageSize);
  }

  goToPreviousPage() {
    // If First Page, do nothing
    if (this.pageNumber === 1) {
      return;
    }
    this.pageNumber--;
    this.pageChangedEvent.emit(this.pageNumber);
  }

  goToNextPage() {
    // If Last Page, do nothing
    if (this.pageNumber === this.totalPages) {
      return;
    }
    this.pageNumber++;
    this.pageChangedEvent.emit(this.pageNumber);
  }
}
