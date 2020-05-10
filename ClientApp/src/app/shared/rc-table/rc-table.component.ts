import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rc-table',
  templateUrl: './rc-table.component.html',
  styleUrls: ['./rc-table.component.css']
})
export class RCTableComponent implements OnInit {

  @Input() tableData;
  @Input() displayedColumns;

  public parsedData;

  constructor() { }

  ngOnInit(): void {

    this.parseTheData();
  }

  parseTheData() {

    if (this.tableData && this.displayedColumns) {

    }

  }
}
