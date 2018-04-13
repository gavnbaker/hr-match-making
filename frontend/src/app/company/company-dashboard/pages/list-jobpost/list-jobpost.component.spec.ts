import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobpostComponent } from './list-jobpost.component';

describe('ListJobpostComponent', () => {
  let component: ListJobpostComponent;
  let fixture: ComponentFixture<ListJobpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListJobpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJobpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
