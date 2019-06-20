import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { HTTP } from '@ionic-native/http/ngx';
import { User } from '../models/user';
import * as jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  private _loginURL="http://52.224.67.101:5000/api/login";
  private _registerURL="http://52.224.67.101:5000/api/register";
  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private nativehttp : HTTP,
  ) { }



userlogin(ename : String, password : String) {
  return this.http.post<any>(this._loginURL, {email : ename , password:password})
}
// decodetoken(token){
//     console.log(newToken);
//    var decoded=jwt_decode(newToken.token);
//     console.log(decoded)
//   }
userregister(ename: String, password: String, name: String, type: String, phoneNO : String)
{
  return this.http.post<any>(this._registerURL, {email: ename, password: password, name: name, type: type, phoneNO:phoneNO})
}


  login(ename: String, password: String) {
    console.log(ename)
    console.log(password)
    return this.http.post('http://52.224.67.101:5000/api/login',
      {email: ename , password: password},
      {
        headers: { 'Content-Type': 'application/json' }
      }
      
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          token => {
            console.log('Token Stored', token);
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }
  register(email: String, password: String, name: String, type: String, phoneNO : String) {
    console.log(email)
    console.log(password)
    console.log(name)
    console.log(type)
    console.log(phoneNO)
    return this.http.post('http://52.224.67.101:5000/api/register',
      {email: email, password: password, name: name, type: type, phoneNO:phoneNO},
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
  // logout() {
  //   const headers = new HttpHeaders({
  //     'Authorization': this.token["token_type"]+" "+this.token["access_token"]
  //   });
  //   return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
  //   .pipe(
  //     tap(data => {
  //       this.storage.remove("token");
  //       this.isLoggedIn = false;
  //       delete this.token;
  //       return data;
  //     })
  //   )
  // }
  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    
    
    return this.http.get<User>('http://52.224.67.101:5000/api', { headers: headers })
    .pipe(
      tap(user => {
        
        return  console.log(user);
       
      })
    )
  }
  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
          console.log(data)
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
        console.log(error)
      }
    );
  }
  
} 