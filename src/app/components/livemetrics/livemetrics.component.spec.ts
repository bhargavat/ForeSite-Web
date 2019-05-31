import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivemetricsComponent } from './livemetrics.component';

describe('LivemetricsComponent', () => {
  let component: LivemetricsComponent;
  let fixture: ComponentFixture<LivemetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivemetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivemetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
