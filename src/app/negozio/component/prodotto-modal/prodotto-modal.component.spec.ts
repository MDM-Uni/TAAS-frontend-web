import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottoModalComponent } from './prodotto-modal.component';

describe('ModalComponent', () => {
  let component: ProdottoModalComponent;
  let fixture: ComponentFixture<ProdottoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdottoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdottoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
