import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherregisterComponent } from './researcherregister.component';

describe('ResearcherregisterComponent', () => {
  let component: ResearcherregisterComponent;
  let fixture: ComponentFixture<ResearcherregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
