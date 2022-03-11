import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliAnimaleComponent } from './dettagli-animale.component';

describe('DettagliAnimaleComponent', () => {
  let component: DettagliAnimaleComponent;
  let fixture: ComponentFixture<DettagliAnimaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettagliAnimaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliAnimaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
