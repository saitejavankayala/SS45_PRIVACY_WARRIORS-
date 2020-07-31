import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaignosisFormComponent } from './daignosis-form.component';

describe('DaignosisFormComponent', () => {
  let component: DaignosisFormComponent;
  let fixture: ComponentFixture<DaignosisFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaignosisFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaignosisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
