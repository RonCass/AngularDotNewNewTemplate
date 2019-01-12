import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRoute2Component } from './child-route2.component';

describe('ChildRoute2Component', () => {
  let component: ChildRoute2Component;
  let fixture: ComponentFixture<ChildRoute2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildRoute2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRoute2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
