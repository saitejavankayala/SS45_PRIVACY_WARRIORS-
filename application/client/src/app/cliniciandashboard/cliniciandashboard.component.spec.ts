import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliniciandashboardComponent } from './cliniciandashboard.component';

describe('CliniciandashboardComponent', () => {
  let component: CliniciandashboardComponent;
  let fixture: ComponentFixture<CliniciandashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliniciandashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliniciandashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
