import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../shared/services/toastr.service';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-rc-table-example',
  templateUrl: './rc-table-example.component.html',
  styleUrls: ['./rc-table-example.component.css']
})
export class RcTableExampleComponent implements OnInit {

  public gridData;
  public displayedColumns = [{ "dataField": "col1", "title": "MyCol1" }, { "dataField": "col2", "title": "MyCol2" }];

  // Pagination
  public pageNumber = 1;
  public pageSize = 20;
  public previousPageButton = 'disabled';
  public totalPages = 1;
  public total: number;
   public currentPage = 1;

  // Sorting
  public sortDirection = '-';
  public sortColumn = 'id';

  public isBusy = false;


  constructor(private dataService: DataService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {

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

}
