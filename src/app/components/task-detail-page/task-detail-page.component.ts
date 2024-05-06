import { Component } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../../shared/side-nav/side-nav.component';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/interface/Task.modal';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-detail-page',
  standalone: true,
  imports: [CommonModule,SideNavComponent,FormsModule],
  templateUrl: './task-detail-page.component.html',
  styleUrl: './task-detail-page.component.scss'
})
export class TaskDetailPageComponent {

task: Task | undefined;
  taskdata: Task[] = [];
  taskid!:number


constructor(
  private route: ActivatedRoute,
  private taskService: TaskService,
  private router:Router
) { }

ngOnInit(): void {

    // Load all tasks when the component initializes
  this.loadTasks();
  this.route.params.subscribe(params => {
    const taskId = params['id'];

      // Fetch the task details based on the ID
    this.taskService.getTaskById(taskId).subscribe((task: Task | undefined) => {
      this.task = task;
    });
  });
}
// for deleting tasks
   Delete(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        // console.log('Task deleted:', id);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Task has been Deleted",
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['dashboard'])
        // Reload tasks after deletion
      },
      (error:any) => {
        console.error('Error deleting task:', error);
      }
    );
  }
  // Method to load all tasks
    loadTasks(): void {
    this.taskService.getTaskData().subscribe(
      (data: Task[]) => {
        this.taskdata = data;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
   // Method to mark a task as completed
  markAsCompleted(taskId: number) {
    const taskToUpdate = this.taskdata.find(task => task.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.status = 'completed';
      this.taskService.updateTask(taskToUpdate).subscribe(
        () => {
          // console.log('Task marked as completed:', taskId);
          this.loadTasks(); // Reload tasks after updating
        },
        (error:any) => {
          console.error('Error marking task as completed:', error);
          // Handle error, e.g., display error message to user
        }
      );
    } else {
      console.error('Task not found with ID:', taskId);
      // Handle error, e.g., display error message to user
    }
  }
   // Method to toggle the status of a task
  toggleTaskStatus(task: Task) {
    if (task.status === 'completed') {
      task.status = 'pending';
    } else {
      task.status = 'completed';
    }
      // Update the task status in the api
    this.taskService.updateTask(task).subscribe(() => {
      // console.log('Task status updated:', task.id);
      this.loadTasks(); 
    }, (error:any) => {
      console.error('Error updating task status:', error);
   
    });
}
//// Method to get the display text for a task status
getStatusText(status: string): string {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'completed':
      return 'Completed';
    case 'overdue':
      return 'Overdue';
    default:
      return '';
  }
}
//// Method to navigate to the edit page for a task
Update(id:any): void {
  this.router.navigateByUrl(`edit/${id}`)
  // console.log('my id',id)
}

}
