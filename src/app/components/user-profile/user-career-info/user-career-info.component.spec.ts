import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCareerInfoComponent } from './user-career-info.component';

describe('UserCareerInfoComponent', () => {
  let component: UserCareerInfoComponent;
  let fixture: ComponentFixture<UserCareerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCareerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCareerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
