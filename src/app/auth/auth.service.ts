import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './auth/user.model';
import { Router } from '@angular/router';

export interface AuthResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  signupUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNfYCIrik5MMyp6VEI9lPIx6QrlRJGlns';
  loginUrl: string ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNfYCIrik5MMyp6VEI9lPIx6QrlRJGlns'

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email:string, password: string){
    return this.http
      .post<AuthResponse>(this.signupUrl, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.hadleError), tap( resData => {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken, resData.expiresIn)
      }))
  }

  logIn(email:string, password: string){
    return this.http.post<AuthResponse>(this.loginUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError( this.hadleError), tap( resData => {
      this.handleAuthentication(resData.email,resData.localId,resData.idToken, resData.expiresIn)
    }))
  }

  autoLogin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenexpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date (userData._tokenexpirationDate)
            )
    if(userData._token){
      this.user.next(loadedUser);
      const expirationDuration = new Date (userData._tokenexpirationDate).getTime() - (new Date().getTime());
      this.autoLogout(expirationDuration);
    }
  }

  logOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expiratinDuration: number){
    this.tokenExpirationTimer = setTimeout(() =>{
      this.logOut()
    }, expiratinDuration)
  }

  private handleAuthentication(email: string, userId: string, token:string, expiresIn: string){
    const expiratinDate = new Date(new Date().getTime() + Number(expiresIn) * 1000);
     const user = new User (email, userId, token , expiratinDate );
     this.user.next(user);
     this.autoLogout(Number(expiresIn) * 1000);
     localStorage.setItem('userData', JSON.stringify(user));
  }

  private hadleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unexpected error occured';
    if( !errorRes.error || !errorRes.error.error){
      return throwError(errorMessage)
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS': 
      errorMessage = 'This email is already exists';
      break;
      case 'EMAIL_NOT_FOUND': 
      errorMessage = 'This email does not exists please signUp';
      break;
      case 'INVALID_PASSWORD': 
      errorMessage = 'Please enter valid password';
      break;
    }
    return throwError(errorMessage);
  }
}