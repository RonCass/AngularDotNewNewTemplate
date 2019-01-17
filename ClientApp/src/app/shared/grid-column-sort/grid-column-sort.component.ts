import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

@Component({
  selector: 'app-grid-column-sort',
  templateUrl: './grid-column-sort.component.html',
  styleUrls: ['./grid-column-sort.component.css']
})
export class GridColumnSortComponent implements OnInit {

  @Input() columnHeadingText: string;
  @Input() columnDataElement: string;
  @Input() isActive: boolean;
  @Input() sortedColumnElement: string;
  @Output() sortColumnEvent = new EventEmitter<string>();

  // Sorting
  public sortDirection = '-';
  // public sortColumn = 'id';

  constructor() {  }

  ngOnInit() {  }

  onSortOrderChange(columnDataElementName: string) {
    this.sortDirection = this.sortDirection === '' ? '-' : '';
    this.sortColumnEvent.emit(columnDataElementName);
  }

}
