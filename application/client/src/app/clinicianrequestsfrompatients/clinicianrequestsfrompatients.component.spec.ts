import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicianrequestsfrompatientsComponent } from './clinicianrequestsfrompatients.component';

describe('ClinicianrequestsfrompatientsComponent', () => {
  let component: ClinicianrequestsfrompatientsComponent;
  let fixture: ComponentFixture<ClinicianrequestsfrompatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianrequestsfrompatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicianrequestsfrompatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
