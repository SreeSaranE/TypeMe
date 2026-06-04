import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTypePage } from './test-type-page';

describe('TestTypePage', () => {
  let component: TestTypePage;
  let fixture: ComponentFixture<TestTypePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTypePage],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTypePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
