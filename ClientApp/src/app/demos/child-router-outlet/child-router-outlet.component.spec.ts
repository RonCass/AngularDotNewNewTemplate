import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRouterOutletComponent } from './child-router-outlet.component';

describe('ChildRouterOutletComponent', () => {
  let component: ChildRouterOutletComponent;
  let fixture: ComponentFixture<ChildRouterOutletComponent>;

  beforeEach(async(() => {
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
