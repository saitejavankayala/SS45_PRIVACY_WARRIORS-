import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologistregisterComponent } from './radiologistregister.component';

describe('RadiologistregisterComponent', () => {
  let component: RadiologistregisterComponent;
  let fixture: ComponentFixture<RadiologistregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiologistregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologistregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
