import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Feeflow } from '../shared/models/feeflow.model';

@Injectable({
  providedIn: 'root'
})
export class FeeflowService {

  constructor(private http: HttpClient) { }

  addFeeflow(Feeflow: Feeflow): Observable<Feeflow> {
    return this.http.post<Feeflow>('/api/feeflow', Feeflow);
  }

  getFeeflows(): Observable<Feeflow[]> {
    return this.http.get<Feeflow[]>('/api/feeflows');
  }

  countFeeflows(): Observable<number> {
    return this.http.get<number>('/api/feeflow/count');
  }

  getFeeflow(Feeflow: Feeflow): Observable<Feeflow> {
    return this.http.get<Feeflow>(`/api/feeflow/${Feeflow._id}`);
  }


  editFeeflow(Feeflow: Feeflow,auth_token:string): Observable<any> {

    return this.http.put(`/api/feeflow/${Feeflow._id}`, Feeflow, { responseType: 'text' });
  }


  deleteFeeflow(Feeflow: Feeflow): Observable<any> {

    return this.http.delete(`/api/feeflow/${Feeflow._id}`, { responseType: 'text' });
  }

  getFeeflowsWithStudentId(studentID: string): Observable<Feeflow[]> {
    return this.http.get<Feeflow[]>(`/api/feeflow/getFeeflowsWithStudentId/${studentID}`);
  }
  getFeeflowsWithAllStudents(): Observable<Feeflow[]> {
    return this.http.get<Feeflow[]>('/api/feeflows/getFeeflowsWithAllStudents');
  }
  getFeeflowsWithAllGroupedStudents(): Observable<any[]> {
    return this.http.get<any[]>('/api/feeflows/getFeeflowsWithAllGroupedStudents');
  }
  getFeeflowsWithAllGroupedStudentsByYear(year1,year2,year3): Observable<any[]> {
    return this.http.get<any[]>(`/api/feeflows/getFeeflowsWithAllGroupedStudentsByYear/${year1}/${year2}/${year3}`);
  }
}
