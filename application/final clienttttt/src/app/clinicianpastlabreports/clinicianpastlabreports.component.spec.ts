import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicianpastlabreportsComponent } from './clinicianpastlabreports.component';

describe('ClinicianpastlabreportsComponent', () => {
  let component: ClinicianpastlabreportsComponent;
  let fixture: ComponentFixture<ClinicianpastlabreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianpastlabreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicianpastlabreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
