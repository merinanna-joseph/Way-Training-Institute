import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  register(user: User): Observable<User> {
    return this.http.post<User>('/api/user', user);
  }

  login(credentials:any): Observable<any> {
    return this.http.post('/api/login', credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  countUsers(): Observable<number> {
    return this.http.get<number>('/api/user/count');
  }
 
  validateUser(user : User): Observable<any> {
    return this.http.put(`/api/user/validate/${user._id}`, user, { responseType: 'text' });
  }

 
  getUser(user: User): Observable<User> {
    return this.http.get<User>(`/api/user/${user._id}`);
  }

  getUserByEmail(user: User): Observable<User> {
   
    return this.http.get<User>(`/api/user/byEmail/${user.email}`);
  }

  editUser(user: User): Observable<any> {
    return this.http.put(`/api/user/${user._id}`, user, {responseType: 'text' });
  }
  editUserPassword(user: User): Observable<any> {
    
    return this.http.put(`/api/user/${user._id}`, user);
  }
  editUserNewPassword(user: User): Observable<any> {
    return this.http.put(`/api/user/usersnewpassword/${user._id}`, user);
  }
 
  deleteUser(user: User): Observable<any> {
  
    return this.http.delete(`/api/user/${user._id}`, { responseType: 'text' });
  }
  getStaffs(): Observable<User[]> {
    return this.http.get<User[]>('/api/users/getbyroles');

  }

  updateStudentCredentials(user: User): Observable<any> {
    return this.http.put(`/api/user/updateStudentCredentials/${user._id}`, user,{responseType: 'text'});
  }
}
