import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultRoutePageComponent } from './default-route-page.component';

describe('DefaultRoutePageComponent', () => {
  let component: DefaultRoutePageComponent;
  let fixture: ComponentFixture<DefaultRoutePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultRoutePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultRoutePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
