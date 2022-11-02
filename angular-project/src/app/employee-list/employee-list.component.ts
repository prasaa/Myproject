import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { EmployeeModel } from '../dashboard/dashboard.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeFormValue !: FormGroup;
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  
  constructor(private router: Router, private formbuilder: FormBuilder, private api: ApiService) { }
 

  ngOnInit(): void {
    this.employeeFormValue = this.formbuilder.group({
      empName : ['', Validators.required],
      contact : ['', Validators.required],
      dept : ['', Validators.required],
      position : ['', Validators.required],
      joinDate : ['', Validators.required],
      salary : ['', Validators.required],
    })
    this.getEmployeeList();
  }

  addEmpDetails(){
    this.openModal(1);
    this.employeeFormValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  saveEmpDetails(){
    this.employeeModelObj.empName = this.employeeFormValue.value.empName;
    this.employeeModelObj.contact = this.employeeFormValue.value.contact;
    this.employeeModelObj.dept = this.employeeFormValue.value.dept;
    this.employeeModelObj.position = this.employeeFormValue.value.position;
    this.employeeModelObj.joinDate = this.employeeFormValue.value.joinDate;
    this.employeeModelObj.salary = this.employeeFormValue.value.salary;
    
    this.api.postEmployee(this.employeeModelObj)
    .subscribe({
      next:(res)=>{
        console.log(res);
        alert("Added");
        this.employeeFormValue.reset();
       this.getEmployeeList();
      }
    })

  }
  getEmployeeList() {
    this.api.getEmployee()
      .subscribe({
        next: (res) => {
          this.employeeData = res;
        }
      })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe({
        next: (res) => {
          alert("Deleted");
          this.getEmployeeList();
        }
      })
  }

  gotoDashboard(){
    this.router.navigate(['/dashboard']);
  }
 

  employeeList(){
    this.router.navigate(['/employee-list']);
  }
  logout(){
    this.router.navigate(['/login']);
  }
// open modal function starts
  showModal = -1;
  openModal(index:any){
    this.showModal = index;
  }

  close(){
    this.showModal = -1;
  }
// end modal function


  editEmployeeData(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.openModal(1);

    this.employeeModelObj.id = row.id;
    this.employeeFormValue.patchValue({
      empName: row.empName,
      contact: row.contact,
      dept: row.dept,
      position: row.position,
      joinDate: row.joinDate,
      salary: row.salary
      
    });

  }

  updateEmpDetails(){
    this.employeeModelObj.empName = this.employeeFormValue.value.empName;
    this.employeeModelObj.contact = this.employeeFormValue.value.contact;
    this.employeeModelObj.dept = this.employeeFormValue.value.dept;
    this.employeeModelObj.position = this.employeeFormValue.value.position;
    this.employeeModelObj.joinDate = this.employeeFormValue.value.joinDate;
    this.employeeModelObj.salary = this.employeeFormValue.value.salary;
    this.api.putEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe({
      next:(res)=>{
        alert("updated");

        this.employeeFormValue.reset();
        this.getEmployeeList();
      }
    })
  }
}
