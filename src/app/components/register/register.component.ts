import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  registerForm: any;
 
  constructor(private fb: FormBuilder, private authService: UserService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {

      // Initialize register form with form fields and validators
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  //for registering users
  register(): void {
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value)
        .subscribe(
          () => {
          Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration was Succesfull",
          showConfirmButton: false,
          timer: 1500
          });
          this.registerForm.reset();
          // console.log('works')
            this.router.navigateByUrl('login')
          },
          (error) => {
            alert('Something went wrong');
          }
        );
    } else {
    }
  }
  //redirect to login after registration
  redirectTologin(){
    this.router.navigateByUrl('login')
  }
}
