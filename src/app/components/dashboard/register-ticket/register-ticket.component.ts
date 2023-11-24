import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from 'src/app/services/main.service';
import jwt_decode from 'jwt-decode';
import { Res } from 'src/app/interfaces/response';

@Component({
  selector: 'app-register-ticket',
  templateUrl: './register-ticket.component.html',
  styleUrls: ['./register-ticket.component.scss'],
})
export class RegisterTicketComponent {
  private route: String = '/ticket';
  public form: FormGroup;
  public user: any;
  public menus!: any;
  public loaded = false;
  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private snackbar: MatSnackBar
  ) {
    let token = sessionStorage.getItem('token') ?? 'No token available';

    this.user = jwt_decode(token);

    this.form = this.fb.group({
      id_status: [1],
      id_category: ['', Validators.required],
      id_severity: ['', Validators.required],
      issue: ['', Validators.required],
      start_date: [null],
      end_date: [null],
      last_update: [null],
      id_dev: ['202311200938305UlWKWP43ydprukqPc', Validators.required],
      id_user: [this.user.id, Validators.required],
      id_system: ['', Validators.required],
      summary: [''],
    });
  }
  ngOnInit(): void {
    this.getMenus();
}
getMenus() {
  this.mainService
    .getRequest({}, `/menu`)
    .subscribe((res: any) => {
      console.log(res);
      this.menus = res.msg;
      this.loaded=true;
    });
}
  onAdd(): void {
    const obj = this.form.value;
    this.mainService.postRequest(obj, this.route).subscribe((res: Res) => {
      this.snackbar.open(`${res.msg}`, 'Aceptar', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
