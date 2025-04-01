import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedin: boolean = false
  loginName: String = ""
  constructor(private router:Router){}

  ngOnInit() {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('token') || "") {
      this.isLoggedin = true
      this.loginName = JSON.parse(sessionStorage.getItem('user') || "").username
    } else {
      this.loginName = ""
      this.isLoggedin = false
    }
  }

  logout() {
    sessionStorage.clear()
    localStorage.clear()
    this.loginName = ""
    this.isLoggedin = false
    this.router.navigateByUrl('/')
  }

}
