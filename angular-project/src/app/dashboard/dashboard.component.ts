import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { EmployeeModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeFormValue !: FormGroup;
  employeeData !: any;

  constructor(private http: HttpClient, private router: Router, private formbuilder: FormBuilder, private api: ApiService) { }

    biodata = ['person1cv.jpg','person2cv.doc','personcv3.pdf'];

    openSelectedCv(data:any){
      alert(data +"opened");
    }
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


  logout() {
    this.router.navigate(['/login']);
  }

  showModal = -1;
  openModal(index: any) {
    this.showModal = index;
  }

  close() {
    this.showModal = -1;
  }

  //uploading file
    
  onFileSelected(event:any) {
    console.log(event);
  }

  upload() { }

}
