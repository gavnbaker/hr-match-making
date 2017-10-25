import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public title = 'Hr Match Making App';
  public isLoggedIn: boolean;
  public loggedInUser: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.logout();
  }

}
