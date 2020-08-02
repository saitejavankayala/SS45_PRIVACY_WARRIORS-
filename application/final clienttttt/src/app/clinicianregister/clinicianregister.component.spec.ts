import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicianregisterComponent } from './clinicianregister.component';

describe('ClinicianregisterComponent', () => {
  let component: ClinicianregisterComponent;
  let fixture: ComponentFixture<ClinicianregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicianregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
