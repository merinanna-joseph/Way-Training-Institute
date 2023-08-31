import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Branch } from '../shared/models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  addBranch(branch: Branch): Observable<Branch> {
    return this.http.post<Branch>('/api/branch', branch);
  }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>('/api/branchs');
  }
  getBranchByCourseId(courseID: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(`/api/branchs/getBranchByCourseId/${courseID}`);
  }
  getBranchById(branchID: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(`/api/branch/${branchID}`);
  }

  deleteBranchByID(branch: Branch): Observable<any> {

    return this.http.delete(`/api/branch/${branch}`, { responseType: 'text' });
  }
getCountofBranchsbyCourseID(courseID: string): Observable<Branch[]> {
  return this.http.get<Branch[]>(`/api/branchs/getCountofBranchsbyCourseID/${courseID}`);
}

}
