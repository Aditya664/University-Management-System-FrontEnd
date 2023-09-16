import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'UniSystem';
  isLoggedIn$!: Observable<boolean>;                  // {1}
  showFiller = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    console.log( this.isLoggedIn$)
  }

  onLogout(){
    this.authService.logout();                      // {3}
  }
}
