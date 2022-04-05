import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnullaOrdineModalComponent } from './annulla-ordine-modal.component';

describe('AnnullaModalComponent', () => {
  let component: AnnullaOrdineModalComponent;
  let fixture: ComponentFixture<AnnullaOrdineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnullaOrdineModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnullaOrdineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
