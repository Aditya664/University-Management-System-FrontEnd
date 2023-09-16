import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;                    
  private formSubmitAttempt!: boolean; 

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService, // {4}
    private router:Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next:(res)=>{
          localStorage.setItem('loggedIn', JSON.stringify(true));
          this.authService.loggedIn.next(true);
          this.router.navigate(['/']);
        },
        error:(err)=>{
          this.snackBar.open(err.error,"Error")
        }
      })
    }
    this.formSubmitAttempt = true;             // {8}
  }
}
