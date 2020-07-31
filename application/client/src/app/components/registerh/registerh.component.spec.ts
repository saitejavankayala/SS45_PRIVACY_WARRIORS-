import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterhComponent } from './registerh.component';

describe('RegisterhComponent', () => {
  let component: RegisterhComponent;
  let fixture: ComponentFixture<RegisterhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
