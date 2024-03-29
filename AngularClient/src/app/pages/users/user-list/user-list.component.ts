import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { UserService } from 'src/app/pages/users/user.service';
export interface User {
  id: number;
  name: string;
  emailConfirmed: string;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['email', 'emailConfirmed', 'action'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  userList = []
  constructor(
    private notifierService: NotifierService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.getalluser();
  }
  setDataSource(data: User[]) {
    this.userList = data;
    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getalluser() {
    this._userService
      .getalluser()
      .subscribe(data => {
        console.log(data);
        if (data != null) {
          this.setDataSource(data)
        }
      }, err => {
        console.log(err)
        this.notifierService.showNotification('Error Occured!', 'Ok', "error");
      })
  }

  makeuseradmin(userId) {
    this._userService.makeuseradmin(userId)
      .subscribe(
        response => {
          console.log(response);
          this.notifierService.showNotification('User is now Admin', 'Ok', "success");
        },
        error => {
          console.log(error);
          this.notifierService.showNotification('Not able to make user admin!', 'Ok', "error");
        });
  }

  addUser(){
    
  }
}
