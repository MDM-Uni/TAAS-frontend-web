import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdineItemStoriaComponent } from './ordine-item-storia.component';

describe('OrdineItemStoriaComponent', () => {
  let component: OrdineItemStoriaComponent;
  let fixture: ComponentFixture<OrdineItemStoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdineItemStoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdineItemStoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
