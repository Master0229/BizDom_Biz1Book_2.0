import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricebookComponent } from './pricebook.component';

describe('PricebookComponent', () => {
  let component: PricebookComponent;
  let fixture: ComponentFixture<PricebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
