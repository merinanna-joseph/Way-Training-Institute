
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Collectionflow } from '../shared/models/collectionflow.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionflowService {

  constructor(private http: HttpClient) { }

  addcollectionFlow(collectionFlow: Collectionflow): Observable<Collectionflow> {
    return this.http.post<Collectionflow>('/api/collectionFlow', collectionFlow);
  }

  getcollectionFlows(): Observable<Collectionflow[]> {
    return this.http.get<Collectionflow[]>('/api/collectionFlows');
  }

  countcollectionFlows(): Observable<number> {
    return this.http.get<number>('/api/collectionFlow/count');
  }

  getcollectionFlow(collectionFlow: Collectionflow): Observable<Collectionflow> {
    return this.http.get<Collectionflow>(`/api/collectionFlow/${collectionFlow._id}`);
  }


  editcollectionFlow(collectionFlow: Collectionflow): Observable<any> {

    return this.http.put(`/api/collectionFlow/${collectionFlow._id}`, collectionFlow, { responseType: 'text' });
  }



  deletecollectionFlow(collectionFlow: Collectionflow): Observable<any> {

    return this.http.delete(`/api/collectionFlow/${collectionFlow._id}`, { responseType: 'text' });
  }

  getcollectionFlowsWithStudentId(studentID: string): Observable<Collectionflow[]> {
    return this.http.get<Collectionflow[]>(`/api/collectionFlows/getcollectionFlowsWithStudentId/${studentID}`);
  }

  deleteCollectionflowByStudent(collectionFlow: Collectionflow): Observable<any> {
    return this.http.delete(`/api/collectionFlow/deleteCollectionflowByStudent/${collectionFlow._id}`,
    { responseType: 'text' });
  }

  getallBook(): Observable<Collectionflow[]> {
    return this.http.get<Collectionflow[]>('/api/collectionFlows/getallbookswithstudentdetails');
  }
  getallCertificate(): Observable<Collectionflow[]> {
    return this.http.get<Collectionflow[]>('/api/collectionFlows/getallcertificateswithstudentdetails');
  }
  getallTransport(): Observable<Collectionflow[]> {
    return this.http.get<Collectionflow[]>('/api/collectionFlows/getalltransportwithstudentdetails');
  }
}
