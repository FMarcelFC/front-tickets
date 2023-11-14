import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Convert, Res } from 'src/app/interfaces/response';
import { Ticket } from 'src/app/interfaces/ticket';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  private route = '/ticket';
  private filter = '/get_dev_tickets';
  private params!: any;
  private user : any;
  public displayedColumns = ['user', 'status','severity', 'start_date', 'end_date', 'module', 'last_update', 'category'];
  public dataSource = new MatTableDataSource<Ticket>();
  public chip1 = false;
  public chip2 = true;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public mainService: MainService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {
    let token = sessionStorage.getItem('token') ?? 'No token available';
    this.user = jwt_decode(token);
    this.params = {id : this.user.id}
  }
  ngOnInit(): void {
    this.getTickets();
  }
  
  getTickets() {
    this.mainService
      .getRequest(this.params, `${this.route}${this.filter}`)
      .subscribe((res: Res) => {
        console.log(res);
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

  createTicket() {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '70%',
      data: null,
    });
    dialogRef.afterClosed().subscribe((result: Res) => {
      if (result) {
        this.getTickets();
        this.snackbar.open(`${result.msg}`, 'Aceptar', {
          duration: 1200,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }
  updateTicket(cashier: Ticket) {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '70%',
      data: cashier,
    });
    dialogRef.afterClosed().subscribe((result: Res) => {
      if (result) {
        this.getTickets();
        this.snackbar.open(`${result.msg}`, 'Aceptar', {
          duration: 1200,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }
  deleteTicket(id: String) {
    Swal.fire({
      title:
        '¿Seguro que quiere eliminar la caja con id ' +
        id +
        ' del registro de cajas?',
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
              this.getTickets();
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
  switchChips() {
    this.chip1 = !this.chip1;
    this.chip2 = !this.chip2;
    if (this.chip1) {
      this.filter = '/get_tickets'
      this.params = {};
    } else {
      this.filter = '/get_dev_tickets'
      this.params = { id : this.user.id }

    }
    this.getTickets();
  }
}