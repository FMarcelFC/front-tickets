import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Res } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  private route: String = "/login";
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ["",  [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
    sessionStorage.clear();
  }

  login() {
    this.authService
      .loginRequest(this.form.value, this.route)
      .subscribe((res: Res) => {
        if (!res.error) {
          
          sessionStorage.setItem("token", res.msg.token ?? '');
          this.router.navigate(["/dashboard"]);
        } else {
          this.form.controls["password"].reset();
          this.snackbar.open(`${res.msg}`, "Aceptar", {
            duration: 4000,
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        }
      });
  }
}
