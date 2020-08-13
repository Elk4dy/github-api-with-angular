import { Component, OnInit } from '@angular/core';
import { UsernameGlobaleService } from 'src/app/services/username-global.service';
import { GetUserInfoService } from 'src/app/services/get-user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public validUsername: boolean = false;

  constructor(
    private globalUsername: UsernameGlobaleService,
    private userInfoService: GetUserInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validateUserName() {
    // Send username to shared service 
    this.globalUsername.changeUsername(this.username);
    // Get user data from api to validate username that user entered
    this.userInfoService.getUserInfo(this.username).subscribe(
      data => {
        // Handle data
        // Hide validation message
        this.validUsername = false;
      },
      error => {
        console.log(error);
        // Show validation message
        this.validUsername = !this.validUsername;
      },
      () => {
        // No errors, route to profile page
        this.router.navigate([this.username])
      }
    );
  }

}
