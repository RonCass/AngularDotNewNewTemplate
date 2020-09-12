import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent implements OnInit {

  @Input() 
  set filterByList(filterByList: FilterByListItem[]) {
    //Insert Default Option
    this.mainFilterByList.push({ filterColumnName: "SELECT ALL", filterColumnValue: "SelectAll" });
    //Insert all others sent in from parent page
    for (const myFilterByListItem of filterByList) {
      this.mainFilterByList.push(myFilterByListItem);
    }
  };
  @Input()
  set mainData(mainData: []) {
    if (mainData.length > this.mainDataLargestSet.length) {
      this.mainDataLargestSet = mainData;
    }
  };

  @Output() filterBy = new EventEmitter<Array<string>>();
  @Output() filterReset = new EventEmitter<boolean>();

  public filterForm;
  public predictiveSearchData = [];
  public mainDataLargestSet = [];
  public mainFilterByList:  FilterByListItem[] = []; 

  constructor() { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      filterColumn: new FormControl('', [Validators.required]),
      filterText: new FormControl('', [Validators.required]),
    });

    this.filterForm.patchValue({
      filterColumn: { filterColumnName: "SELECT ALL", filterColumnValue: "SelectAll" },
      filterText: ""
    });
  }

  filterTable() {
    let fc = this.filterForm.get('filterColumn').value;
    let ft = this.filterForm.get('filterText').value;

    this.filterBy.emit([fc.filterColumnValue, ft]);
  }

  resetFilter() {
    //this.filterForm.reset();
    //this.filterForm.patchValue({ filterColumn: "", filterText: "" });
    //this.filterForm.markAsPristine();
    this.filterReset.emit(true);
    this.filterForm.patchValue({
      filterColumn: { filterColumnName: "SELECT ALL", filterColumnValue: "SelectAll" },
      filterText: ""
    });

  }

  searchTextChanged(event) {
    if (event.target.value.length > 0) {

      this.predictiveSearchData = [];
      const fc = this.filterForm.get('filterColumn').value;

      //No Column chose, so just return
      if (fc === "") {
        return;
      }

      const myColumnArray = [];

      //Create the array with the columns to search
      if (fc.filterColumnValue === "SelectAll") {
        for (const myFilterByListItem of this.mainFilterByList) {
          if (myFilterByListItem.filterColumnValue != "SelectAll") {
            myColumnArray.push(myFilterByListItem.filterColumnValue);
          }
        }
      }
      else if (fc.filterColumnValue === "tenantLegalName") {
        //Tenant Legal Name is a one off for the User - My Applications Page
        myColumnArray.push("stationInfo.tenantLegalName");
        myColumnArray.push("tenantLegalInfo.tenantLegalName");
      }
      else {
        myColumnArray.push(fc.filterColumnValue);
      }

      //Load the predictive search items
      for (const item of this.mainDataLargestSet) {       
        
        for (const myColumnName of myColumnArray) {
          const myItemValue = _.get(item, myColumnName);
          if (myItemValue) { //Protect against empty value, triggers error on toLowerCase() below
            if (_.includes(myItemValue.toString().toLowerCase(), event.target.value.toString().toLowerCase())) {
              if (!_.includes(this.predictiveSearchData, myItemValue)) {
                this.predictiveSearchData.push(myItemValue);
              }
            }
          }
        }
      }

      //Sort the list for the dropdown
      this.predictiveSearchData = _.sortBy(this.predictiveSearchData, []);
    }
  }

  onFilterColumnChanged(event) {
    this.predictiveSearchData = [];
    this.filterForm.patchValue({ filterText: "" });   
  }

  // This will display the correct text and not the actual value of the selected item
  displayFn(option?): string {
    // Show the actual siteNumber and not the value when something is selected
    return option ? option : undefined;
  }

  //Needed to patch the default value to Select All - Filter Column matSelect
  compareFilterColumn(object1: any, object2: any) {
    return object1 && object2 && object1.filterColumnName === object2.filterColumnName;
  }
}

export class FilterByListItem {
  filterColumnName: string;
  filterColumnValue: string;
}
