import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../components/user-profile/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserInfoService {

  constructor(private http: HttpClient) { }

  // Get user info service from api
  getUserInfo(username: string): Observable<any> {
    return this.http.get<User>('https://api.github.com/users/' + username).pipe(
       map((data: User) => {
             return data;
           }), catchError(this.handleError)
    );
  }

  // Get repos info service from api
  getUserRepos(username: string): Observable<any> {
    // Use per_page parameter in api link
    let params = new HttpParams;
    params = params.append('per_page', '100');
    return this.http.get<any>('https://api.github.com/users/' + username + '/repos?', { params: params }).pipe(
      map((data: any) => {
            return data;
          }), catchError(this.handleError)
   );
  }

  handleError(error) {
    let errorMessage = 'An error occured';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}
}
