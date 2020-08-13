import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-personal-info',
  templateUrl: './user-personal-info.component.html',
  styleUrls: ['./user-personal-info.component.scss']
})
export class UserPersonalInfoComponent implements OnInit {
  // Get user data from parent component
  @Input() user: any;

  constructor() { }

  ngOnInit(): void {
  }

}
