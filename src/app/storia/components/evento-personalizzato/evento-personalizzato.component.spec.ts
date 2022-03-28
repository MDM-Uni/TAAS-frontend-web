import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoPersonalizzatoComponent } from './evento-personalizzato.component';

describe('EventoPersonalizzatoComponent', () => {
  let component: EventoPersonalizzatoComponent;
  let fixture: ComponentFixture<EventoPersonalizzatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoPersonalizzatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoPersonalizzatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
