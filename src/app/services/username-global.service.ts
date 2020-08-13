import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsernameGlobaleService {
  private username = new BehaviorSubject('');
  currentUsername = this.username.asObservable();

  constructor() { }

  changeUsername(updatedUsername: string) {
    this.username.next(updatedUsername)
  }
}