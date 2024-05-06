import { Routes } from '@angular/router';
import { TaskDetailPageComponent } from './components/task-detail-page/task-detail-page.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { authguardGuard } from './core/guards/authguard.guard';
import { RegisterComponent } from './components/register/register.component';



export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
   
    {path:'login',
       loadComponent:()=>import('../app/components/login/login.component').then((c)=>c.LoginComponent),
       
    },
    {path:'register',
        component:RegisterComponent,
    },
    {path:'dashboard',
        loadComponent:()=>import('../app/components/dashboard/dashboard.component').then((c)=>c.DashboardComponent),
       canActivate:[authguardGuard]
    },
    {path:'taskcreationpage',
        loadComponent:()=>import('../app/components/taskcreationpage/taskcreationpage.component').then((c)=>c.TaskcreationpageComponent),
        canActivate:[authguardGuard]
    },
  
    {path:'taskdetailpage/:id',
    loadComponent:()=>import('../app/components/task-detail-page/task-detail-page.component').then((c)=>c.TaskDetailPageComponent),
    canActivate:[authguardGuard]},
    {path:'taskdetailpage',
    component:TaskDetailPageComponent,canActivate:[authguardGuard]},
   
    {path:'profile',
    loadComponent:()=>import('../app/components/profile/profile.component').then((c)=>c.ProfileComponent),
   },
    {
        path: 'edit/:id',
        loadComponent:()=>import('../app/components/edit/edit.component').then((c)=>c.EditComponent),
        canActivate:[authguardGuard]
    },
    {path:'piechart',component:PiechartComponent}
   
   
  
  
    
];
