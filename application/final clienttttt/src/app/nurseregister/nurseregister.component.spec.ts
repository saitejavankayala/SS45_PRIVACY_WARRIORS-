import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseregisterComponent } from './nurseregister.component';

describe('NurseregisterComponent', () => {
  let component: NurseregisterComponent;
  let fixture: ComponentFixture<NurseregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
