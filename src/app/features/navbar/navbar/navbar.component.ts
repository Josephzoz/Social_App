import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { IUserInfo } from '../../../core/models/iuser-info.interface';
import { AuthService } from '../../../core/services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private _AuthService = inject(AuthService);
  userInfo?: IUserInfo;

  ngOnInit(): void {
    initFlowbite();
    const data = localStorage.getItem('userInfo');
    console.log(data);
    if (data) {
      this.userInfo = JSON.parse(data);
    }
  }


  logOut() {
    this._AuthService.SignOut()

  }
}
