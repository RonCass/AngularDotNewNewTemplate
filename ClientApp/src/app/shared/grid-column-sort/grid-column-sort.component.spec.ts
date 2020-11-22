import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridColumnSortComponent } from './grid-column-sort.component';

describe('GridColumnSortComponent', () => {
  let component: GridColumnSortComponent;
  let fixture: ComponentFixture<GridColumnSortComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridColumnSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridColumnSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
