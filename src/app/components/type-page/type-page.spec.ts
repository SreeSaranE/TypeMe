import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePage } from './type-page';

describe('TypePage', () => {
  let component: TypePage;
  let fixture: ComponentFixture<TypePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypePage],
    }).compileComponents();

    fixture = TestBed.createComponent(TypePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
