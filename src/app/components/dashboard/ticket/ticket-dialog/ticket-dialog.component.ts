import { Platform } from '@angular/cdk/platform';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Res } from 'src/app/interfaces/response';
import { Ticket } from 'src/app/interfaces/ticket';
import jwt_decode from 'jwt-decode';
import { MainService } from 'src/app/services/main.service';

export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "DD MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "DD MMMM YYYY",
  },
};

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "es-ES" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class TicketDialogComponent implements OnInit{
  private route: String = "/ticket";
  form: FormGroup;
  mode: Number;
  title: String;
  menus!: any;
  loaded = false;
  public user: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ticket,
    private mainService: MainService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {
    let token = sessionStorage.getItem('token') ?? 'No token available';
    this.user = jwt_decode(token);
    if (this.data) {
      this.mode = 1;
      this.title = "Actualizar";
      this.form = this.fb.group({
        id: [this.data.id, Validators.required],
        id_status: [this.data.id_status],
        id_category: [this.data.id_category],
        id_severity: [this.data.id_severity, Validators.required],
        issue: [this.data.issue, Validators.required],
        start_date: [this.data.start_date, Validators.required],
        end_date: [this.data.end_date],
        last_update: [moment().format("YYYY-MM-DD h:mm:ss")],
        id_dev: [this.data.id_dev, Validators.required],
        id_user: [this.data.id_user, Validators.required],
        created_at: [this.data.created_at],
        id_system: [this.data.id_system, Validators.required],
        summary: [this.data.summary],
      });
    } else {
      this.mode = 0;
      this.title = "Nuevo";
      this.form = this.fb.group({
        id_status: [1],
        id_category: [""],
        id_severity: ["", Validators.required],
        issue: ["", Validators.required],
        start_date: [null],
        end_date: [null],
        last_update: [null],
        id_dev: ["202311200938305UlWKWP43ydprukqPc", Validators.required],
        id_user: [this.user.id, Validators.required],
        id_system: ["", Validators.required],
        summary: [""],
      });
    }
  }
  onAdd(): void {
    const obj = this.form.value;
    console.log(obj)
    if (this.mode === 0) {
      this.mainService.postRequest(obj, this.route).subscribe((res: Res) => {
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
    } else {
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
  onDateChange(event: any, controlName: string) {
    const selectedDate = event.value;

    if (selectedDate) {
      // Formatear la fecha seleccionada al formato "YYYY-MM-DD"
      const formattedDate = selectedDate.format("YYYY-MM-DD");

      // Actualizar el valor del FormControl con la fecha formateada
      this.form.controls[controlName].setValue(formattedDate);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  isCreateMode() {
    return this.mode === 0;
  }

  isUpdateMode() {
    return this.mode === 1;
  }
}
