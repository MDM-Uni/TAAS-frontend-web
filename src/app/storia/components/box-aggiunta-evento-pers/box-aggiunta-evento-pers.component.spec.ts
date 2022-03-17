import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxAggiuntaEventoPersComponent } from './box-aggiunta-evento-pers.component';

describe('BoxAggiuntaEventoPersComponent', () => {
  let component: BoxAggiuntaEventoPersComponent;
  let fixture: ComponentFixture<BoxAggiuntaEventoPersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxAggiuntaEventoPersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxAggiuntaEventoPersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
