import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxVisitaPrenComponent } from './box-visita-pren.component';

describe('BoxVisitaPrenComponent', () => {
  let component: BoxVisitaPrenComponent;
  let fixture: ComponentFixture<BoxVisitaPrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxVisitaPrenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxVisitaPrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
