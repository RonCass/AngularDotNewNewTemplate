import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridListAndPagingComponent } from './grid-list-and-paging.component';

describe('GridListAndPagingComponent', () => {
  let component: GridListAndPagingComponent;
  let fixture: ComponentFixture<GridListAndPagingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridListAndPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridListAndPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
