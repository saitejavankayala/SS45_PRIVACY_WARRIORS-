import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalradiologistComponent } from './hospitalradiologist.component';

describe('HospitalradiologistComponent', () => {
  let component: HospitalradiologistComponent;
  let fixture: ComponentFixture<HospitalradiologistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalradiologistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalradiologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
