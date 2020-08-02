import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdComponent } from './registerh.component';

describe('RegisterdComponent', () => {
  let component: RegisterdComponent;
  let fixture: ComponentFixture<RegisterdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
