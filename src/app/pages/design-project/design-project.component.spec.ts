import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignProjectComponent } from './design-project.component';

describe('DesignProjectComponent', () => {
  let component: DesignProjectComponent;
  let fixture: ComponentFixture<DesignProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
