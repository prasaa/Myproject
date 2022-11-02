import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public regForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      firstname : new FormControl('',[Validators.required]),
      lastname : new FormControl('',[Validators.required]),
      yourMail : new FormControl('', [Validators.required, Validators.email]),
      newPassword : new FormControl('', [Validators.required, Validators.minLength(6)])
    }); 
  }



  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.email]),
    password : new FormControl('', [Validators.required]),
  }); 

  get email(){
    return this.loginForm.get("email");
  }

  get password(){
    return this.loginForm.get("password");
  }

  get firstname(){
    return this.regForm.get('firstname');

  }
  get lastname(){
    return this.regForm.get('lastname');
  }
  get regemail(){
    return this.regForm.get('yourMail');
  }

  get regpassword(){
    return this.regForm.get('newPassword');
  }

 showModal = -1;
  openModal(index:any){
    this.showModal = index;
  }

  close(){
    this.showModal = -1;
  }
  login() {
    //console.log(this.loginForm.value);
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>
      {
        const user = res.find((a:any)=>
        {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if(user){
          alert("login success!!");
          this.router.navigate(['dashboard'])
        }else{
          alert('email not found');
        }
      }
      )
  }

  register(){
    // console.log(this.regForm.value);
    this.http.post<any>("http://localhost:3000/signUpUsers",this.regForm.value)
    .subscribe(res=> {
      alert("registered");
      this.regForm.reset();
      
    })
  }

}
