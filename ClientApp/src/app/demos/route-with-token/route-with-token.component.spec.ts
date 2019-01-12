import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteWithTokenComponent } from './route-with-token.component';

describe('RouteWithTokenComponent', () => {
  let component: RouteWithTokenComponent;
  let fixture: ComponentFixture<RouteWithTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteWithTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteWithTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
