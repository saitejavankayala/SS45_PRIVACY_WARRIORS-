import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitaldoctorComponent } from './hospitaldoctor.component';

describe('HospitaldoctorComponent', () => {
  let component: HospitaldoctorComponent;
  let fixture: ComponentFixture<HospitaldoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitaldoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitaldoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
