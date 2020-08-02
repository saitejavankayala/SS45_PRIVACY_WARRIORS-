import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalloginComponent } from './hospitallogin.component';

describe('HospitalloginComponent', () => {
  let component: HospitalloginComponent;
  let fixture: ComponentFixture<HospitalloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
