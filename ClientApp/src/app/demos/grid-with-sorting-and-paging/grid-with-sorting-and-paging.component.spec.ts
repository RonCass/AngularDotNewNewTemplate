import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridWithSortingAndPagingComponent } from './grid-with-sorting-and-paging.component';

describe('GridWithSortingAndPagingComponent', () => {
  let component: GridWithSortingAndPagingComponent;
  let fixture: ComponentFixture<GridWithSortingAndPagingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridWithSortingAndPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridWithSortingAndPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
