import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { StorageUtil } from '../../utils/storage.util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewAllUsersEditDialogComponent } from '../view-all-users-edit-dialog/view-all-users-edit-dialog.component';
import { AllEmployeesService } from 'src/app/services/all-employees.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})

export class ViewAllUsersComponent implements OnInit {

  //-- Initialize 
  public selectedEmployee: any;
  public allEmployees: any;
  public _allFirstNamesOfEmployee: any;
  public _allEmailAdressOfEmployee: any;

  constructor(
    private readonly http: HttpClient,
    private readonly employeeService: EmployeeService,
    private readonly allEmployeeService: AllEmployeesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.filterForFirstNames()
  }
  
  //-- Getter
  get employee(): Employee | undefined {
    return this.employeeService.employee;
  }

  //-- Functions
  public filterForFirstNames() {
    this.allEmployees = this.allEmployeeService.employees;
    this._allFirstNamesOfEmployee = this.allEmployees.map((element: { first_name: any; }) => element.first_name)
    this._allEmailAdressOfEmployee = this.allEmployees.map((element: { emailAddress: any; }) => element.emailAddress)
  }

  //-- Function called by the delete button
  public deleteSelectedUser(selectedEmployeeName: string) {
    this.selectedEmployee = this.allEmployees.find((x: { first_name: string; }) => x.first_name === selectedEmployeeName);

    const id = this.selectedEmployee.employeeId
    this.deleteSelectedUserKeycloak(id)
  }

  public deleteSelectedUserKeycloak(id: string) {

    // Get the mastertoken
    const masterToken = StorageUtil.storageRead(StorageKeys.AuthKeyMaster)
    
    //-- Define the headers
    const headers = new HttpHeaders ({
      "Authorization": `Bearer ${masterToken}`
    })

    //-- Delete the user
    return this.http.delete<any>(environment.herokuURL + `auth/admin/realms/tidsbankencase/users/` + id, {headers} )
    .subscribe({
      next: () => {
        console.log("User succesfully deleted from keycloak")

        //-- Also delete from the API
        this.deleteSelectedUserAPI(id)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  

  public deleteSelectedUserAPI(id: string) {

    // Get the mastertoken
    const employeeToken = StorageUtil.storageRead(StorageKeys.AuthKey)
    
    //-- Define the headers
    const headers = new HttpHeaders ({
      "Authorization": `Bearer ${employeeToken}`
    })

    //-- Delete from API
    return this.http.delete<any>(environment.APIURL + `employee/delete/` + id, {headers} )
      .subscribe({
        next: () => {
          console.log("Succesfully deleted from the API")

          //-- Also delete from the sessionStorage
          this.allEmployeeService.employees = this.allEmployees

        },
        error: (error) => {
          console.log("Error while deleting from the API: " + error)
        }
      })
  }

  public giveAdminButton(selectedEmployeeName: string) {

    //-- Changes the selected employee to the one thats clicked
    this.selectedEmployee = this.allEmployees.find((x: { first_name: string; }) => x.first_name === selectedEmployeeName);
    
    this.selectedEmployee.admin = true
    this.changeAdminRightsAPI(true)
    //this.changeAdminRightsKeyCloak(true)
  }

  public revokeAdminButton(selectedEmployeeName: string) {

    //-- Changes the selected employee to the one thats clicked
    this.selectedEmployee = this.allEmployees.find((x: { first_name: string; }) => x.first_name === selectedEmployeeName);

    this.changeAdminRightsAPI(false)
    this.selectedEmployee.admin = false
    //this.changeAdminRightsKeyCloak(this.admin)
  }

  public openDialogEditAllUsers(selectedEmployeeName: string): void {
    
    //-- Change the selected employee to the one clicked 
    this.selectedEmployee = this.allEmployees.find((x: { first_name: string; }) => x.first_name === selectedEmployeeName);

    //-- Open the dialog and pass the selectedEmployee
    this.dialog.open(ViewAllUsersEditDialogComponent, {
      width: '250px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { pageValue: this.selectedEmployee }
    })
  }

  public changeAdminRightsKeyCloak(bool: boolean) {
    // Get the mastertoken
    const masterToken = StorageUtil.storageRead(StorageKeys.AuthKeyMaster)
    
    //const user = StorageUtil.storageRead<User>(StorageKeys.User) 
    
    const id = "44a78e86-4130-4543-915b-a34bd3e5f8b4"
    const groupId = "686e663c-c36a-4fa5-8bde-79bba14acd7b"
    
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    })

    var urlencoded = new URLSearchParams();

    urlencoded.append("Authorization", `Bearer ${masterToken}`); 

    //-- Post the new user
    return this.http.put<any>(environment.herokuURL + `auth/admin/realms/tidsbankencase/users/` + id + `/groups/` + groupId, urlencoded, {headers} )
    .subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (error) => {
      console.log(error)
      }
    })
  }

  public changeAdminRightsAPI(bool: boolean) {

    const id = this.selectedEmployee.employeeId

    // Get the mastertoken
    const selectedEmployeeToken = StorageUtil.storageRead(StorageKeys.AuthKey)

    //-- Define the headers
    const headers = new HttpHeaders ({
      "accept": "*/*",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${selectedEmployeeToken}`
      })

    var body = {
      "employeeId": id,
      "first_name": this.selectedEmployee.first_name,
      "last_name": this.selectedEmployee.last_name,
      "emailAddress": this.selectedEmployee.emailAddress,
      "admin": bool
    }

    return this.http.patch<any>(environment.APIURL + `employee/update/` + id , body, {headers})
    .subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
