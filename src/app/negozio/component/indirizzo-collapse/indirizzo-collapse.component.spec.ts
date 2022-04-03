import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirizzoCollapseComponent } from './indirizzo-collapse.component';

describe('IndirizzoCollapseComponent', () => {
  let component: IndirizzoCollapseComponent;
  let fixture: ComponentFixture<IndirizzoCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndirizzoCollapseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndirizzoCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
