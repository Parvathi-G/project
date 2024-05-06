import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskcreationpageComponent } from './taskcreationpage.component';

describe('TaskcreationpageComponent', () => {
  let component: TaskcreationpageComponent;
  let fixture: ComponentFixture<TaskcreationpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskcreationpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskcreationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
