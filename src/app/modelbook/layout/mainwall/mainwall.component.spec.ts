import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainwallComponent } from './mainwall.component';

describe('MainwallComponent', () => {
  let component: MainwallComponent;
  let fixture: ComponentFixture<MainwallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainwallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainwallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
