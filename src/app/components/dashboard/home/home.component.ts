import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Res } from 'src/app/interfaces/response';
import { Ticket } from 'src/app/interfaces/ticket';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
import { TicketDialogComponent } from '../ticket/ticket-dialog/ticket-dialog.component';
import { EmpFilter } from 'src/app/interfaces/filter';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private route = '/ticket';
  private filter = '/get_tickets';
  public displayedColumns = [
    'user',
    'status',
    'severity',
    'start_date',
    'end_date',
    'module',
    'last_update',
    'category',
  ];
  public dataSource = new MatTableDataSource<Ticket>();

  public severities = ['All', 'High', 'Medium', 'Low'];
  public categories = ['All', 'Security', 'Interface', 'Backend'];
  public status = [
    'All',
    'New',
    'Assigned',
    'Accepted',
    'Confirmed',
    'Rejected',
    'In progress',
    'Resolved',
  ];
  public empFilters: EmpFilter[] = [];
  public defaultValue = 'All';
  public filterDictionary = new Map<string, string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public mainService: MainService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTickets();
    this.empFilters.push({
      name: 'Severity',
      options: this.severities,
      defaultValue: this.defaultValue,
    });
    this.empFilters.push({
      name: 'Category',
      options: this.categories,
      defaultValue: this.defaultValue,
    });
    this.empFilters.push({
      name: 'Status',
      options: this.status,
      defaultValue: this.defaultValue,
    });
    this.dataSource.filterPredicate = function (record:any,filter) {
      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for(let [key,value] of map){
        isMatch = (value=="All") || (record[key as keyof Ticket] == value); 
        if(!isMatch) return false;
      }
      return isMatch;
    }
  }
  getTickets() {
    this.mainService
      .getRequest({}, `${this.route}${this.filter}`)
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
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyEmpFilter(ob:MatSelectChange,empfilter:EmpFilter) {

    this.filterDictionary.set(empfilter.name.toLowerCase(),ob.value);


    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    
    this.dataSource.filter = jsonString;
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
}
