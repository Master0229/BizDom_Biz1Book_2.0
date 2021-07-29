import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenominationEntryComponent } from './denomination-entry.component';

describe('DenominationEntryComponent', () => {
  let component: DenominationEntryComponent;
  let fixture: ComponentFixture<DenominationEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenominationEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenominationEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
