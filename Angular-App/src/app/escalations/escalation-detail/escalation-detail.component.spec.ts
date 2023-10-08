import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationDetailComponent } from './escalation-detail.component';

describe('EscalationDetailComponent', () => {
  let component: EscalationDetailComponent;
  let fixture: ComponentFixture<EscalationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalationDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
