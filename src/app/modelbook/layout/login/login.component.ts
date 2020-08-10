import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../../../service/authen.service';
import {TokenStorageService} from '../../../service/tokenstorage.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IAccount} from '../../../models/iaccount';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginAccountForm:FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  accountEmail = '';

  constructor(private authService: AuthenService,
              private tokenStorage: TokenStorageService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;

    }
    this.loginAccountForm = this.fb.group({
      email:[''],
      password:[''],
    })
  }

  createSubmit(): void{
    let account:IAccount =this.loginAccountForm.value;
    this.authService.login(account).subscribe(
      data =>{
        console.log(data);
        this.accountEmail = data.email;
        this.isLoggedIn = true;
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveAccount(data.email);
      }
    )
  }

  logOut() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
