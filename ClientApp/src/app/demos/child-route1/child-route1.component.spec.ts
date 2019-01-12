import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRoute1Component } from './child-route1.component';

describe('ChildRoute1Component', () => {
  let component: ChildRoute1Component;
  let fixture: ComponentFixture<ChildRoute1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildRoute1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRoute1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
