import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallsManagement } from './halls-management';

describe('HallsManagement', () => {
  let component: HallsManagement;
  let fixture: ComponentFixture<HallsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HallsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallsManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
