import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToastTestComponent } from './toast-test.component';

describe('ToastTestComponent', () => {
  let component: ToastTestComponent;
  let fixture: ComponentFixture<ToastTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
