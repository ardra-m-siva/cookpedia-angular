import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FooterComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]
    })
  }

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      this.api.registerApi({ username, email, password }).subscribe({
        next: (res: any) => {
          alert(`Welcome ${res.username}, Please Login`)
          this.router.navigateByUrl('/login')
          this.registerForm.reset()
        },
        error: (reason: any) => {
          alert(reason.error)
          this.registerForm.reset()
        }
      })
    } else {
      alert("Form is Invalid")
    }
  }

}
