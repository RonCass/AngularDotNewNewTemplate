import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListAndPagingComponent } from './grid-list-and-paging.component';

describe('GridListAndPagingComponent', () => {
  let component: GridListAndPagingComponent;
  let fixture: ComponentFixture<GridListAndPagingComponent>;

  beforeEach(async(() => {
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
