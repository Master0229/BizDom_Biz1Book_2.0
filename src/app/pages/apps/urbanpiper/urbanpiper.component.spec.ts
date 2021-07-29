import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanpiperComponent } from './urbanpiper.component';

describe('UrbanpiperComponent', () => {
  let component: UrbanpiperComponent;
  let fixture: ComponentFixture<UrbanpiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrbanpiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrbanpiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
