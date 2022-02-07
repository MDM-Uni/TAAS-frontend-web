import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaItemClassicComponent } from './visita-item-classic.component';

describe('VisitaItemClassicComponent', () => {
  let component: VisitaItemClassicComponent;
  let fixture: ComponentFixture<VisitaItemClassicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitaItemClassicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitaItemClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
