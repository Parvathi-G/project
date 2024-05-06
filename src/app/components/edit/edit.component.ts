import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/interface/Task.modal';
import { SideNavComponent } from '../../shared/side-nav/side-nav.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,SideNavComponent,FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  taskForm!: FormGroup;
  task: Task = { id: 0, title: '', description: '', status: 'pending', priority: 'low', dueDate: new Date() ,userid:''}; // Initialize with appropriate default values
  currentDate: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private service: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //Initialize task form with form fields and validators
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [new Date(), Validators.required],
      priority: ['low', Validators.required],
      status: ['pending', Validators.required]
    });
   
   
  }
 
ngOnInit(): void {
  //get task ID from route parameters
  const idParam = this.route.snapshot.paramMap.get('id');
  // console.log('Raw ID from route:', idParam);

  //Convert ID parameter to string
  const itemId = (this.route.snapshot.paramMap.get('id') ?? '0');
  // console.log('itemId:', itemId);

  //Fetch task data from service based on ID
  this.service.getTask().subscribe(
    (data: Task[]) => {
      // console.log('Fetched data:', data);
      const item = data.find((item: Task) => item.id === itemId);
      if (item) {
        this.task = item;
        this.taskForm.patchValue(item);
        // console.log('Task found:', item);
      } else {
        // console.log(`Task with ID ${itemId} not found`);
      }
    },
    (error:any) => {
      console.error('Error fetching task data:', error);
    }
  );
}

//update task
updateTask(): void {

  // console.log('Updating task with ID:', this.task.id);
  this.service.updateTaskData(this.task.id, this.taskForm.value).subscribe(
    () => {
      // alert('Task details updated successfully');
      // console.log('Task details updated successfully');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Task has been Updated",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigateByUrl(`taskdetailpage/${this.task.id}`);
    },
    (error: any) => {
      console.error('Error updating task details:', error);
    }
  );
 
}

}


