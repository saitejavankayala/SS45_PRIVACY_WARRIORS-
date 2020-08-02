import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorregisterComponent } from './doctorregister.component';

describe('DoctorregisterComponent', () => {
  let component: DoctorregisterComponent;
  let fixture: ComponentFixture<DoctorregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
