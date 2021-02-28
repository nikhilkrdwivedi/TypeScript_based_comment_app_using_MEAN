import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCallsService } from 'src/app/http-calls.service';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInFormErrorText: string;
  passwordImg: string = 'showPassword.svg';
  passwordStatus: boolean = true;

  constructor(private _sharedService: SharedService, private _fb: FormBuilder,private _httpCallsService:HttpCallsService) { }
  authForm = this._fb.group({
    email: [''],
    password: [''],
  });
  ngOnInit(): void { 
    //if user already login
    // console.log(JSON.parse((sessionStorage.getItem('userMetaData'))).isLogin)
    if(sessionStorage.getItem('userMetaData') && JSON.parse((sessionStorage.getItem('userMetaData'))).isLogin){
    this._sharedService.navigatePage('/');
    }

  }

  navigatePage(endPoint: string) {
    this._sharedService.navigatePage(endPoint);
  }

  validateFormData() {
    if (!this.authForm.value.email || !this.authForm.value.password) {
      this.signInFormErrorText = 'Email and password both are mandatory fields';
      return false;
    }
    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(this.authForm.value.email)) {
      this.signInFormErrorText = 'Enter a valid email Id';
      return false;
    }
    return true
  }

  signIn() {
    console.log(this.authForm.value)
    this.signInFormErrorText = '';
    if (this.validateFormData()) {
      let userMetaData = JSON.stringify({
        isLogin:true,
        email:this.authForm.value.email

      })
    
      this._httpCallsService.login(this.authForm.value).subscribe(
        (res:any)=>{
      console.log(res)
      // localStorage.setItem('access_token',res["access_token"])
      // localStorage.setItem('userCxt',JSON.stringify(res["userCxt"]))
      res['data'][0]['isLogin']=true;
      sessionStorage.setItem('userMetaData',JSON.stringify(res['data'][0]))
      this._sharedService.navigatePage('/');
    },error=>{
      console.log(error.error)
      this.signInFormErrorText = 'Bad Request. Try Again.';
      return false;
    });
    }
  }
  loadImg() {
    this.passwordStatus = !this.passwordStatus
    console.log(this.passwordStatus)
    if (this.passwordStatus) {
      this.passwordImg = 'showPassword.svg';
    } else {
      this.passwordImg = 'hidePassword.svg';
    }
  }
}
