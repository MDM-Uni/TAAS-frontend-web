import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProdottiComponent } from './lista-prodotti.component';

describe('NegozioHomepageComponent', () => {
  let component: ListaProdottiComponent;
  let fixture: ComponentFixture<ListaProdottiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProdottiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProdottiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
