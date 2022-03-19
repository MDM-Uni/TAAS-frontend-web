import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaItemStoriaComponent } from './visita-item-storia.component';

describe('VisitaItemStoriaComponent', () => {
  let component: VisitaItemStoriaComponent;
  let fixture: ComponentFixture<VisitaItemStoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitaItemStoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitaItemStoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
