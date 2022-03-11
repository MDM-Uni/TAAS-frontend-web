import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiAnimaleComponent } from './aggiungi-animale.component';

describe('AggiungiAnimaleComponent', () => {
  let component: AggiungiAnimaleComponent;
  let fixture: ComponentFixture<AggiungiAnimaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiAnimaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiAnimaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
