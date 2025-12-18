import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsManagement } from './shows-management';

describe('ShowsManagement', () => {
  let component: ShowsManagement;
  let fixture: ComponentFixture<ShowsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowsManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
