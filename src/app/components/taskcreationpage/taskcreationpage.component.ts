import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../../shared/side-nav/side-nav.component';
import Swal from 'sweetalert2';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/interface/Task.modal';


@Component({
  selector: 'app-taskcreationpage',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,SideNavComponent,FormsModule],
  templateUrl: './taskcreationpage.component.html',
  styleUrl: './taskcreationpage.component.scss'
})
export class TaskcreationpageComponent {
  route: any;
taskForm: FormGroup;
currentDate: Date = new Date();

  constructor(private taskService: TaskService, private router: Router, private fb: FormBuilder) {
     // Initialize the taskForm with form controls and validators
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['',Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value as Task;
      this.taskService.addTask(taskData).subscribe({
        next: () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Task has been added",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    else{
      Swal.fire({
        icon: "info",
        title: "Please fill all fields!",  
      });
    }
  }
  // Method to update a task
  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe(
      () => {
        // console.log('Task updated successfully');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Task has been updated",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }
}