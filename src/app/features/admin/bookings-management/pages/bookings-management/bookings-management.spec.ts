import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsManagement } from './bookings-management';

describe('BookingsManagement', () => {
  let component: BookingsManagement;
  let fixture: ComponentFixture<BookingsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
