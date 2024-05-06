import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../../shared/side-nav/side-nav.component';
import { UserService } from '../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MatIconModule,SideNavComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})


export class ProfileComponent {

  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  newPassword: string | undefined;
  currentPassword: string | undefined;
  id: any;
  editingCurrentPassword: boolean = false;
editingUsername: boolean = false;
editingEmail: boolean = false;
editingNewPassword: boolean = false;

  constructor(private profileService: UserService) {}

  ngOnInit(): void {
   
     // Fetch user details from local storage on initialization
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('loggedUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        if (!this.editingCurrentPassword) {
          this.currentPassword = user.password;
        }
      }
      // console.log(storedUser)
    }
  }
//for updating user details
  updateProfile(): void {
 
    let passwordToUpdate: string | undefined;
    if (this.currentPassword && !this.newPassword) {
      passwordToUpdate = this.currentPassword;
    } else if (!this.currentPassword && this.newPassword) {
      passwordToUpdate = this.newPassword;
    } else if (this.currentPassword && this.newPassword) {
      passwordToUpdate = this.newPassword;
    }
    
    const updatedProfile = {
      username: this.username,
      email: this.email,
      password: passwordToUpdate, 
      id: this.id
    };
  
    // console.log(updatedProfile); 
  
    this.profileService.updateUserProfile(this.id, updatedProfile).subscribe(
      (response: any) => {
        // console.log('Profile updated successfully');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Profile has been Updated",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: any) => {
        console.error('Error updating profile:', error);
      }
    );
  }
  
  // Method to toggle edit mode for profile fields
  toggleEdit(field: string): void {
    switch (field) {
      case 'currentPassword':
        this.editingCurrentPassword = !this.editingCurrentPassword;
        break;
      case 'username':
        this.editingUsername = !this.editingUsername;
        break;
      case 'email':
        this.editingEmail = !this.editingEmail;
        break;
      case 'newPassword':
        this.editingNewPassword = !this.editingNewPassword;
        break;
      default:
        break;
    }
  }
  
}