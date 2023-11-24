import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Res } from 'src/app/interfaces/response';
import { User } from 'src/app/interfaces/user';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit{
  private route = '/user';
  public displayedColumns = ['name', 'email','phone', 'registered', 'actions'];
  public dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public mainService: MainService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}
    ngOnInit(): void {
      this.getUsers();
    }
getUsers(){
  this.mainService
  .getRequest({}, `${this.route}/get_all_users`)
  .subscribe((res: Res) => {
    if (res.error) {
      this.snackbar.open(`${res.msg}`, 'Aceptar', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {

      this.dataSource.data = res.msg;
    }
  });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

createUser() {
  const dialogRef = this.dialog.open(UserDialogComponent, {
    width: '50%',
    data: null,
  });
  dialogRef.afterClosed().subscribe((result: Res) => {
    if (result) {
      this.getUsers();
      this.snackbar.open(`${result.msg}`, 'Aceptar', {
        duration: 1200,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  });
}
updateUser(user: User) {
  const dialogRef = this.dialog.open(UserDialogComponent, {
    width: '50%',
    data: user,
  });
  dialogRef.afterClosed().subscribe((result: Res) => {
    if (result) {
      this.getUsers();
      this.snackbar.open(`${result.msg}`, 'Aceptar', {
        duration: 1200,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  });
}
deleteUser(id: String) {
  Swal.fire({
    title:
      '¿Seguro que quiere el usuario con id ' +
      id +
      ' del registro?',
    text: 'Esta operación no se puede revertir.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.value) {
      this.mainService
        .deleteRequest({}, `${this.route}/${id}`)
        .subscribe((res: Res) => {
          if (res.error) {
            Swal.fire('Error eliminando registro.', res.msg, 'error');
          } else {
            this.getUsers();
            Swal.fire(
              'Eliminado',
              'El registro ha sido eliminado.',
              'success'
            );
          }
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Haz cancelado la operación.',
        'Ningún registro eliminado',
        'error'
      );
    }
  });
}
}
