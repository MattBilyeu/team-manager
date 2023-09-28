import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrDashComponent } from './mgr-dash.component';

describe('MgrDashComponent', () => {
  let component: MgrDashComponent;
  let fixture: ComponentFixture<MgrDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MgrDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MgrDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
