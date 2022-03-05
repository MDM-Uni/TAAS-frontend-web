import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegozioHomepageComponent } from './negozio-homepage.component';

describe('NegozioHomepageComponent', () => {
  let component: NegozioHomepageComponent;
  let fixture: ComponentFixture<NegozioHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegozioHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegozioHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
