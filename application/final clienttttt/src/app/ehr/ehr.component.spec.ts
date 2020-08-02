import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EhrComponent } from './ehr.component';

describe('EhrComponent', () => {
  let component: EhrComponent;
  let fixture: ComponentFixture<EhrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
