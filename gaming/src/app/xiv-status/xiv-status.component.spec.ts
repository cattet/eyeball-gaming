import { ComponentFixture, TestBed } from '@angular/core/testing';

import { xivStatusComponent } from './xiv-status.component';

describe('xivStatusComponent', () => {
  let component: xivStatusComponent;
  let fixture: ComponentFixture<xivStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [xivStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(xivStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
