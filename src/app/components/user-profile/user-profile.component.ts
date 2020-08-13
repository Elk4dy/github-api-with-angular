import { Component, OnInit, HostListener } from '@angular/core';
import { GetUserInfoService } from 'src/app/services/get-user-info.service';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public innerWidth: number = window.innerWidth;
  public username: string;
  public user: User;

  constructor(
    private userInfoService: GetUserInfoService,
    private router: Router
  ) { }

  // Get window size on change
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    // Get user name from active router
    this.username = this.router.url.substring(1);
    // Intilize user from user model
    this.user = new User();
    // Get user info from api
    this.userInfoService.getUserInfo(this.username).subscribe((data) => {
      // Map items from api to only use repo model proprties
      this.user.avatar = data.avatar_url;
      this.user.bio = data.bio;
      this.user.blog = data.blog
      this.user.company = data.company;
      this.user.email = data.email;
      this.user.followers = data.followers;
      this.user.following = data.following;
      this.user.location = data.location;
      this.user.name = data.name;
      this.user.publicRepos = data.public_repos;
      this.user.username = data.login
    });
  }

}
