import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private _sharedService: SharedService, private _fb: FormBuilder) { }
  authForm = this._fb.group({
    email: [''],
    password: [''],
  });
  ngOnInit(): void { }

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
      sessionStorage.setItem('userMetaData',userMetaData)
      this._sharedService.navigatePage('/');
      // this._http.signInUser(this.authForm.value).subscribe(res=>{
    //   console.log(res)
    //   localStorage.setItem('access_token',res["access_token"])
    //   localStorage.setItem('userCxt',JSON.stringify(res["userCxt"]))
    //   this._router.navigate([`/`]);
    // },error=>{
    //   console.log(error.error)
    //   this.signInFormErrorText = 'Bad Request. Try Again.';
    //   return false;
    // });
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
