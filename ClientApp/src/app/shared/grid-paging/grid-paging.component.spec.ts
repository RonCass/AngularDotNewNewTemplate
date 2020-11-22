import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridPagingComponent } from './grid-paging.component';

describe('GridPagingComponent', () => {
  let component: GridPagingComponent;
  let fixture: ComponentFixture<GridPagingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
