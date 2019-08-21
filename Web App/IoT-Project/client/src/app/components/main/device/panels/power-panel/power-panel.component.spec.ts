import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerPanelComponent } from './power-panel.component';

describe('PowerPanelComponent', () => {
  let component: PowerPanelComponent;
  let fixture: ComponentFixture<PowerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
