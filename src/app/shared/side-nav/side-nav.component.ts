import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule,RouterOutlet,CommonModule,FormsModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
 isSlideOut=true;
  authService: any;
  username: string | undefined;
  id: any;

 constructor(private router:Router,private service:UserService){}


 ngOnInit(): void {

    // Check if localStorage is available in the browser
   if (typeof localStorage !== 'undefined') {
     const storedUser = localStorage.getItem('loggedUser');
     if (storedUser) {
       const user = JSON.parse(storedUser);
       this.id = user.id;
       this.username = user.username;
       // this.password = user.password;
       
       }
     }
     
   }

// Method to toggle the slide out behavior of the side nav
 toggleSlideOut():void{
  this.isSlideOut=!this.isSlideOut;
 }
 // Method to navigate to the user's profile page
 OnUser(){
  this.router.navigate(['profile'])
 }
 // Method to navigate to the dashboard page
 OnDash(){
  // console.log("works")
  this.router.navigate(['dashboard']);
 
 }
 // Method for logout
 OnOut(){
  
  localStorage.removeItem('loggedUser');
  this.router.navigate(['login'])
 }
}
