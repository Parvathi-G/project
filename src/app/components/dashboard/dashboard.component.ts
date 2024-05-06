import { Component, ElementRef } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../../shared/side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { Chart,PieController,ArcElement  } from 'chart.js';
Chart.register(PieController);
Chart.register(ArcElement);
import Swal from 'sweetalert2';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/interface/Task.modal';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,SideNavComponent,MatIconModule,FormsModule,NgxPaginationModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 
  taskdata: Task[] = [];
  statusFilter: string = 'all';
  taskPrioritiesData: { priority: string, count: number }[] = [];
  priorityCounts: { [key: string]: number } = {};
  totalTasks: number = 0;
  pendingTasks: number = 0;
  overdueTasks: number = 0;
  completedTasks: number = 0;
  currentPage = 1; 
  itemsPerPage = 5; 
  paginationId = 'mypagination';
  

  constructor(
    private taskservice: TaskService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

   //for loading task when component intializes
  ngOnInit(): void {
    this.loadTasks(); 
    
  }
 
  //method to loadtask from the service created
  private loadTasks(): void {
    this.taskservice.getTaskData().subscribe(
      (data: any) => {
        this.taskdata = data;
        this.calculateTaskPriorities();
        this.renderChart();
        this.calculateTaskCounts();
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  //To calculate task count based on status
  private calculateTaskCounts(): void {
    this.totalTasks = this.taskdata.length;
    this.pendingTasks = this.taskdata.filter((task) => task.status === 'pending').length;
    this.overdueTasks = this.taskdata.filter((task) => task.status === 'overdue').length;
    this.completedTasks = this.taskdata.filter((task) => task.status === 'completed').length;
  }
//For calculating the priority of status
  private calculateTaskPriorities(): void {
    this.priorityCounts = {};
    this.taskdata.forEach(task => {
      this.priorityCounts[task.priority] = (this.priorityCounts[task.priority] || 0) + 1;
    });

    this.taskPrioritiesData = Object.keys(this.priorityCounts).map(priority => ({
      priority,
      count: this.priorityCounts[priority]
    }));
  }
 //for rendering piechart
  private renderChart(): void {
    const pieChartLabels = this.taskPrioritiesData.map(item => item.priority);
    const pieChartData = this.taskPrioritiesData.map(item => item.count);

    const ctx = (this.elementRef.nativeElement as HTMLElement).querySelector('#pieChart') as HTMLCanvasElement | null; // Add type annotation
  
    if (ctx) {
      {
        // Destroy existing chart if it exists
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
          existingChart.destroy();
        }
      }

    //for creating new chart
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: pieChartLabels,
          datasets: [{
            data: pieChartData,
            backgroundColor: [
              'rgb(171,71,188)',
              'rgb(159, 204, 46)',
              'rgb(250, 159, 27)',
             
            ]
          }]
        }
      });
    }
  }
  //sorting title in alphabetical order
  sortTitle() {
    this.taskdata.sort((a, b) => a.title.localeCompare(b.title));
  }
  // to return the sliced array for the current page
  get pagedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.taskdata.slice(startIndex, endIndex);
  }

  // for handling page change event
  pageChanged(event: any): void {
    this.currentPage = event;
    this.loadTasks();
  }

  //for deleting task
  Delete(id: number): void {
    this.taskservice.deleteTask(id).subscribe(
      () => {
        // console.log('Task deleted:', id);
        this.loadTasks()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Task has been deleted",
          showConfirmButton: false,
          timer: 1500
        });
       this.loadTasks()
      },
      (error:any) => {
        console.error('Error deleting task:', error);
      }
    );
  }
  //for navigating to task detail page
  view(id: number): void {
    this.router.navigateByUrl(`taskdetailpage/${id}`);
  }
 //for filtering task by status
  applyFilter(): void {
    if (this.statusFilter === 'all') {
      this.loadTasks();
    } else {
      this.taskservice.getTasksByStatus(this.statusFilter).subscribe(
        (data: any) => {
          this.taskdata = data;
          // this.calculateTaskPriorities();
          // this.renderChart();
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }
  }

//Track by function for ngFor
  trackById(index: number, item: any): number {
    return item.id;
  }

//to mark a task as completed
  markAsCompleted(taskId: number): void {
    const taskToUpdate = this.taskdata.find(task => task.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.status = 'completed';
      this.taskservice.updateTask(taskToUpdate).subscribe(
        () => {
          // console.log('Task marked as completed:', taskId);
          this.loadTasks();
        },
        (error:any) => {
          console.error('Error marking task as completed:', error);
        }
      );
    } else {
      console.error('Task not found with ID:', taskId);
    }
  }

  //to toggle task status
  toggleTaskStatus(task: Task): void {
    if (task.status === 'completed') {
      task.status = 'pending';
    } else {
      task.status = 'completed';
    }
    this.taskservice.updateTask(task).subscribe(() => {
      // console.log('Task status updated:', task.id);
      this.loadTasks();
    }, (error:any) => {
      console.error('Error updating task status:', error);
    });
  }

   // to navigate to task creation page
  navigateToTaskCreationPage(): void {
    this.router.navigate(['/taskcreationpage']);
  }

  //to get status text based on status value
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
}