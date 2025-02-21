import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionGroupComponent } from './solution-group.component';

describe('SolutionGroupComponent', () => {
  let component: SolutionGroupComponent;
  let fixture: ComponentFixture<SolutionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
