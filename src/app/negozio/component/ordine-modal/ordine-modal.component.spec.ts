import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdineModalComponent } from './ordine-modal.component';

describe('OrdineModalComponent', () => {
  let component: OrdineModalComponent;
  let fixture: ComponentFixture<OrdineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdineModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
