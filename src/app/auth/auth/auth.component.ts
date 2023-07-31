import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode:boolean = true;
  isLoading:boolean = false;
  error:string = null;
  authObs: Observable<AuthResponse>;

  constructor( private authservice: AuthService, private router: Router){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if(this.isLoginMode){
      this.authObs = this.authservice.logIn(email, password);
    }else{
      this.authObs = this.authservice.signUp(email, password)
            
    }
    this.authObs.subscribe( resData => {
      // console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    }, errorRes => {
      // console.log(errorRes); 
      this.error = errorRes;
      this.isLoading = false;
    })
    form.reset();
  }
  onHandleError(){
    this.error = null;
  }

}
