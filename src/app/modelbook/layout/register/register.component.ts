import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../../../service/account.service';
import {IAccount} from '../../../models/iaccount';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  errorMessage = '';
  registerForm: FormGroup;
  confirmPassword = '';
  isRegisterFail = false;

  constructor(private accountService:AccountService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email:[''],
      name:[''],
      password:['']
    })

  }


  submitRegister() {
    let newAccount: IAccount = this.registerForm.value;
    if(this.confirmPassword == newAccount.password){
      this.accountService.createAccount(newAccount).subscribe(
        (data)=>{
          if(data == 'Đăng ký thành công'){
            alert("Đăng ký thành công")
            this.router.navigate(['login']);
          }else {
            this.errorMessage = data;

          }
          this.isRegisterFail=true;


        console.log(data)},
        ()=>{
          this.errorMessage = 'Lỗi trong quá trình đăng kí'
        }
      )
    }else {
      this.errorMessage = 'Hai mật khẩu không trùng khớp'
    }

  }
}
