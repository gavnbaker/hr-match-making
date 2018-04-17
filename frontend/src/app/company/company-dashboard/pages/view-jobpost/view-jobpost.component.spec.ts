import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobpostComponent } from './view-jobpost.component';

describe('ViewJobpostComponent', () => {
  let component: ViewJobpostComponent;
  let fixture: ComponentFixture<ViewJobpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJobpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
