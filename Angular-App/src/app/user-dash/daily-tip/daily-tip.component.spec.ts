import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTipComponent } from './daily-tip.component';

describe('DailyTipComponent', () => {
  let component: DailyTipComponent;
  let fixture: ComponentFixture<DailyTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyTipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
