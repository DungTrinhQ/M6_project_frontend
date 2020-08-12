import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendLayoutComponent } from './friend-layout.component';

describe('FriendLayoutComponent', () => {
  let component: FriendLayoutComponent;
  let fixture: ComponentFixture<FriendLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
