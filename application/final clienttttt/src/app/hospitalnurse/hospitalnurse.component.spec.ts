import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalnurseComponent } from './hospitalnurse.component';

describe('HospitalnurseComponent', () => {
  let component: HospitalnurseComponent;
  let fixture: ComponentFixture<HospitalnurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalnurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalnurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
