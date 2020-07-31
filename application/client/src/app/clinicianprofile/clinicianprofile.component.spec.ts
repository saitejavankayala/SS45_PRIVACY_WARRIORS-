import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicianprofileComponent } from './clinicianprofile.component';

describe('ClinicianprofileComponent', () => {
  let component: ClinicianprofileComponent;
  let fixture: ComponentFixture<ClinicianprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicianprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
