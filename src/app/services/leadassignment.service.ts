import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Leadassignment } from '../shared/models/leadassignment.model';

@Injectable({
  providedIn: 'root'
})
export class LeadassignmentService {

  constructor(private http: HttpClient) { }
  addLeadassignment(leadassignment: Leadassignment): Observable<Leadassignment> {
    return this.http.post<Leadassignment>('/api/leadassignment', leadassignment);
  }

  getLeadassignments(): Observable<Leadassignment[]> {
    return this.http.get<Leadassignment[]>('/api/leadassignments');
  }
  getLeadassignmentsById(): Observable<Leadassignment[]> {
    return this.http.get<Leadassignment[]>('/api/leadassignments/getLeadassignmentsById');
  }
  countLeadassignments(): Observable<number> {
    return this.http.get<number>('/api/leadassignment/count');
  }
 
  getLeadassignment(leadassignment: Leadassignment): Observable<Leadassignment> {
    return this.http.get<Leadassignment>(`/api/leadassignment/${leadassignment._id}`);
  }

  editLeadassignment(leadassignment: Leadassignment): Observable<any> {
    // alert(leadassignment._id);
    return this.http.put(`/api/leadassignment/${leadassignment._id}`, leadassignment, {responseType: 'text' });
  }
  
  deleteLeadassignment(leadassignment: Leadassignment): Observable<any> {
    return this.http.delete(`/api/leadassignment/${leadassignment._id}`, { responseType: 'text' });
  }
 

}
