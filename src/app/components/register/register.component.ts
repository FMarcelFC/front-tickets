import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from '../../services/main.service';
import { Res } from 'src/app/interfaces/response';
import { Profile } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  form: FormGroup;
  private route: String = "/create_user";
  public profiles!: Profile[];
  public genders = [{
    id: 1,
    gender: 'Male'
  },
  {
    id: 2,
    gender: 'Female'
  }];
  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    const confirmPasswordValidator: ValidatorFn = (
      control: AbstractControl
    ): ValidationErrors | null => {
      return control.value.password === control.value.password_check
        ? null
        : { passwordNoMatch: true };
    };
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      first_name: ["", [Validators.required, Validators.minLength(2)]],
      last_name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      password_check: ["", Validators.required],
      phone: ["", [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
      ]],
      picture: ["example.jpg", Validators.required],
      id_profile: ["", Validators.required],
      id_gender: ["", Validators.required],
    }, { validators: confirmPasswordValidator });
  }
  ngOnInit(): void {
      this.getMenus();
  }
  register() {
    this.mainService
      .postRequest(this.form.value, this.route)
      .subscribe((res: Res) => {
        if (!res.error) {
          this.snackbar.open(`Se ha registrado tu usuario, debe ser aceptado por uno de los administradores para poder ingresar al sistema.`, "Aceptar", {
            duration: 4000,
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        } else {
          this.snackbar.open(`${res.msg}`, "Aceptar", {
            duration: 4000,
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        }
      });
  }

  getMenus() {
    this.mainService
      .getRequest({}, '/get_profiles')
      .subscribe((res: Res) => {
        if (!res.error) {
          this.profiles = res.msg;
        } else {
          this.snackbar.open(`${res.msg}`, "Aceptar", {
            duration: 4000,
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        }
      });

  }
}
