export interface Task {
    id: any;
    title: string;
    dueDate: Date;
    status: 'pending' | 'completed' | 'overdue';
    description:string;
    priority: 'low' | 'medium' | 'high';
    [key: string]: any;
    userid:any
    
  }