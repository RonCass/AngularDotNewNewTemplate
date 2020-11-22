import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoutingExamplesComponent } from './routing-examples.component';

describe('RoutingExamplesComponent', () => {
  let component: RoutingExamplesComponent;
  let fixture: ComponentFixture<RoutingExamplesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
