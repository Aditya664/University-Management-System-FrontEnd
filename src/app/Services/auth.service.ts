import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Models/User';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthService {
  private readonly baseUrl = "https://localhost:7239"
  public loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router,
    private http:HttpClient
  ) {
    const savedLoggedIn = localStorage.getItem('loggedIn');
    if (savedLoggedIn) {
      this.loggedIn.next(JSON.parse(savedLoggedIn));
    }
  }

  login(user: User):Observable<any>{
      const params = new HttpParams()
      .set('Email', user.email)
      .set('Password', user.password);
      return this.http.post(this.baseUrl+"/api/Login", null, { params });
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}