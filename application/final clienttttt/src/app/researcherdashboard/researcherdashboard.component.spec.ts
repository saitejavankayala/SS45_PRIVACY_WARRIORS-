import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherdashboardComponent } from './researcherdashboard.component';

describe('ResearcherdashboardComponent', () => {
  let component: ResearcherdashboardComponent;
  let fixture: ComponentFixture<ResearcherdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
