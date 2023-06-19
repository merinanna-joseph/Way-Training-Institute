import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Lead } from '../shared/models/lead.model';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http: HttpClient) { }

  addLead(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>('/api/lead', lead);
  }

  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>('/api/leads');
  }

  countLeads(): Observable<number> {
    return this.http.get<number>('/api/lead/count');
  }

  getLead(lead: Lead): Observable<Lead> {
    return this.http.get<Lead>(`/api/lead/${lead._id}`);
  }


  editLead(lead: Lead): Observable<any> {
    // alert(JSON.stringify(lead));
    return this.http.put(`/api/lead/${lead._id}`, lead, {responseType: 'text' });
  }


  deleteLead(lead: Lead): Observable<any> {

    return this.http.delete(`/api/lead/${lead._id}`, { responseType: 'text' });
  }

  getLeadsByAssgnedId(lead_id: string): Observable<Lead[]> {
    return this.http.get<Lead[]>(`/api/lead/getbyassignedToId/${lead_id}`);
  }
  getLeadById(lead_id: string): Observable<Lead> {
    return this.http.get<Lead>(`/api/lead/getLeadById/${lead_id}`);
  }
  getLeadswithUser(): Observable<Lead[]> {
    return this.http.get<Lead[]>('/api/leads/getLeadswithUser');
  }
  getLeadByUserWithAssignedTo(user_id: string): Observable<Lead[]> {
    return this.http.get<Lead[]>(`/api/leads/getLeadByUserWithAssignedTo/${user_id}`);
  }
 
}
