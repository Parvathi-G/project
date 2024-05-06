import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: any;
  constructor(private fb: FormBuilder, private authService: UserService,private http:HttpClient,private router:Router) { }



  
  ngOnInit(): void {
    // Initialize login form with form fields and validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    
    
  }

  //for toggling the button
  redirectToregister(){
    this.router.navigateByUrl('register')
  }

  //method for login
  login(): void {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(
        (res) => {
          const user = res.find((a: any) => a.email === this.loginForm.value.email && a.password === this.loginForm.value.password);
          if (user) {

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login was Succesfull",
              showConfirmButton: false,
              timer: 1500
              });
         
      
        localStorage.setItem('loggedUser', JSON.stringify(user)); 
            this.loginForm.reset();
            this.router.navigateByUrl('dashboard')
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "User not found!",
            });
          }
        },
        (err) => {
          console.error('Error:', err);
          alert('Something went wrong');
        }
      );
    }
  }
}

function setUser(user: any, any: any) {
  throw new Error('Function not implemented.');


}
