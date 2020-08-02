import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherprofileComponent } from './researcherprofile.component';

describe('ResearcherprofileComponent', () => {
  let component: ResearcherprofileComponent;
  let fixture: ComponentFixture<ResearcherprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
