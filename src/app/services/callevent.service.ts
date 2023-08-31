import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Callevent } from '../shared/models/callevent.model';

@Injectable({
  providedIn: 'root'
})
export class CalleventService {

  constructor(private http: HttpClient) { }

  addCallevent(callevent: Callevent): Observable<Callevent> {
    return this.http.post<Callevent>('/api/callevent', callevent);
  }

  getCallevents(): Observable<Callevent[]> {
    return this.http.get<Callevent[]>('/api/callevents');
  }

  getCalleventsByLead(leadId:string): Observable<Callevent[]> {
    return this.http.get<Callevent[]>(`/api/callevents/byLead/${leadId}`);
  }
  getCalleventsByUser(userId:string): Observable<Callevent[]> {
    return this.http.get<Callevent[]>(`/api/callevents/byUser/${userId}`);
  }
  countCallevents(): Observable<number> {
    return this.http.get<number>('/api/callevent/count');
  }
 
  getCallevent(callevent: Callevent): Observable<Callevent> {
    return this.http.get<Callevent>(`/api/callevent/${callevent._id}`);
  }

  getCalleventByUserId(callevent: Callevent): Observable<Callevent> {
    return this.http.get<Callevent>(`/api/callevent/calleventByUserId/${callevent._id}`);
  }

  editCallevent(callevent: Callevent): Observable<any> {
    
    return this.http.put(`/api/callevent/${callevent._id}`, callevent, {responseType: 'text'});
  }
  
  
  deleteCallevent(callevent: Callevent): Observable<any> {
  
    return this.http.delete(`/api/callevent/${callevent._id}`, { responseType: 'text' });
  }
 
  
  getAllCalleventsByLead(): Observable<Callevent[]> {
    return this.http.get<Callevent[]>(`/api/callevents/allCalleventsByLead/`);
  }
  getCalleventsByUserAndLead(userId,leadId): Observable<Callevent[]> {
    return this.http.get<Callevent[]>(`/api/callevents/byUserandLead/${userId}/${leadId}`);
  }
}
