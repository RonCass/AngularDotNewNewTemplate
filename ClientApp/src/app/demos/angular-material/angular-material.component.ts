import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataService } from '../../core/services/data.service';
import { ToastrService } from '../../core/services/toastr.service';

@Component({
  selector: 'app-angular-material',
  templateUrl: './angular-material.component.html',
  styleUrls: ['./angular-material.component.css']
})
export class AngularMaterialComponent implements OnInit {

  myControl = new FormControl();
  myControl2 = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  public dynamicData;
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

  myModel;

  constructor(private dataService: DataService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  inputTextChanged(event) {
    // Only go get data after the third character
    if (event.target.value.length > 2) {

      this.dataService
      .getDummyDataBySearchText(this.pageNumber, this.pageSize, (this.sortDirection + this.sortColumn), event.target.value)
      .subscribe(
        response => {
          this.dynamicData = response.items;
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

  displayFn(option?): string  {
    // Show the actual col1 name value when something is selected so it doesnt just show the value.
    return option ? option.col1 : undefined;
  }
}
