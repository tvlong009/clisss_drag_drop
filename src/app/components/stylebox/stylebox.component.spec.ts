import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleboxComponent } from './stylebox.component';

describe('StyleboxComponent', () => {
  let component: StyleboxComponent;
  let fixture: ComponentFixture<StyleboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
