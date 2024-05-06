import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import { Chart,registerables } from 'chart.js'; 


import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/interface/Task.modal';

Chart.register(...registerables)
@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.scss'
})
export class PiechartComponent implements OnInit {
  

  taskData: Task[] = [];
  taskPrioritiesData: { priority: string, count: number }[] = [];
  priorityCounts: { [key: string]: number } = {};

  constructor(private taskService: TaskService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.taskService.getTaskData().subscribe(
      (data: Task[]) => {
        this.taskData = data;
        this.calculateTaskPriorities();
        this.renderChart();
      },
      (error: any) => {
        console.error('Error fetching task data:', error);
        // Handle error, e.g., display error message to user
      }
    );
  }

  calculateTaskPriorities(): void {
    this.priorityCounts = {};
    this.taskData.forEach(task => {
      this.priorityCounts[task.priority] = (this.priorityCounts[task.priority] || 0) + 1;
    });

    this.taskPrioritiesData = Object.keys(this.priorityCounts).map(priority => ({
      priority,
      count: this.priorityCounts[priority]
    }));
  }

  renderChart(): void {
    const pieChartLabels = this.taskPrioritiesData.map(item => item.priority);
    const pieChartData = this.taskPrioritiesData.map(item => item.count);

    const ctx = (this.elementRef.nativeElement as HTMLElement).querySelector('#pieChart') as HTMLCanvasElement;
  
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: pieChartLabels,
          datasets: [{
            data: pieChartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ]
          }]
        }
      });
    }
  }

  ngAfterViewInit(): void {
    // No need to fetch data again, it's already fetched in ngOnInit
    this.renderChart();
  }
}
