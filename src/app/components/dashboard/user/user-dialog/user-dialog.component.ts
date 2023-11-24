import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Res } from 'src/app/interfaces/response';
import { User } from 'src/app/interfaces/user';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  private route: String = "/user";
  public form: FormGroup;
  public gender = [{id : 1, value: "Male"},{id: 2, value:"Female"}];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private mainService: MainService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      id: [this.data.id, Validators.required],
      name: [this.data.name, Validators.required],
      first_name: [this.data.first_name, Validators.required],
      last_name: [this.data.last_name, Validators.required],
      email: [this.data.email, Validators.required],
      password: ["", Validators.required],
      phone: [this.data.phone, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
      ]],
      picture: [this.data.picture, Validators.required],
      id_gender: [this.data.id_gender, Validators.required],
      register_date: [this.data.register_date],
    });
  }
  onAdd(): void {
    const obj = this.form.value;
      this.mainService.putRequest(obj, this.route).subscribe((res: Res) => {
        if (res.error) {
          this.snackbar.open(`${res.msg}`, "Aceptar", {
            duration: 4000,
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        } else {
          this.dialogRef.close(res);
        }
      });
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
}
