import { Component, OnInit, Input } from '@angular/core';
import { GetUserInfoService } from 'src/app/services/get-user-info.service';
import { Router } from '@angular/router';
import { Repo } from '../models/repo.model';

@Component({
  selector: 'app-user-career-info',
  templateUrl: './user-career-info.component.html',
  styleUrls: ['./user-career-info.component.scss']
})
export class UserCareerInfoComponent implements OnInit {

  @Input() user: any;
  public repoFilterName: string;
  public username: string;
  public repos: Repo[] = [];
  public isStared: boolean = false;
  public filteredItems: any = [];

  constructor(
    private getRepos: GetUserInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get username from active router
    this.username = this.router.url.substring(1);
    
    // Get repos data from api
    this.getRepos.getUserRepos(this.username).subscribe((data) => {
      data.map((item) => {
        // Map items from api to only use repo model proprties
        let repo = new Repo;
        repo.name = item.name;
        repo.updatedAt = new Date(item.updated_at);
        repo.url = item.html_url;
        repo.stars = item.stargazers_count;
        repo.language = item.language;
        repo.forks = item.forks_count;
        if (item.license)
          repo.license = item.license.name;
        else
          repo.license = undefined;
        repo.description = item.description;
        repo.isStared = false;
        // Push repo object to repos array
        this.repos.push(repo);
        // Assign copy from repos array
        this.assignCopy();
      });
    })
  }

  // Assign copy from repos array function
  assignCopy() {
    this.filteredItems = Object.assign([], this.repos);
  }

  // Filter function
  filterRepos(value) {
    // When nothing has typed
    if (!value) {
      this.assignCopy();
    }
    // Filter repos data
    this.filteredItems = this.repos.filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  // Add repo to stared repos
  stared(repo) {
    repo.isStared = !repo.isStared
  }

  // Clear filter value
  clearFilter() {
    this.repoFilterName = '';
    this.assignCopy();
  }

}
