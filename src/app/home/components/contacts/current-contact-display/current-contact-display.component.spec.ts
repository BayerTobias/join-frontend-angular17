import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentContactDisplayComponent } from './current-contact-display.component';

describe('CurrentContactDisplayComponent', () => {
  let component: CurrentContactDisplayComponent;
  let fixture: ComponentFixture<CurrentContactDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentContactDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentContactDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
