import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from './../../core/services/data.service';
import { Book } from './../../core/services/models';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private dataService: DataService) {

    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts')
      .subscribe(result => {
        this.forecasts = result;
      },
      error => console.error(error));
  }

  ngOnInit() {

    const bookId = 1;
    let selectedBook: Book; // = new Book();

    // GetBookById from DataService
    //this.dataService.getBookById(bookId)
    //  .subscribe(
    //    (data: Book) => selectedBook = data,
    //    (err: any) => console.log(err),
    //    () => console.log('Completion Handler')
    //  );
  }


}


interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
