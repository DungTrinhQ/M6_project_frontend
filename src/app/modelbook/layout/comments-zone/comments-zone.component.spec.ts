import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsZoneComponent } from './comments-zone.component';

describe('CommentsZoneComponent', () => {
  let component: CommentsZoneComponent;
  let fixture: ComponentFixture<CommentsZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
