import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChildRouterOutletComponent } from './child-router-outlet.component';

describe('ChildRouterOutletComponent', () => {
  let component: ChildRouterOutletComponent;
  let fixture: ComponentFixture<ChildRouterOutletComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildRouterOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
