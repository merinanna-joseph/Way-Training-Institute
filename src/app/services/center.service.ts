import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Center } from '../shared/models/center.model';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  constructor(private http: HttpClient) { }

  addcenter(center: Center): Observable<Center> {
    return this.http.post<Center>('/api/center', center);
  }

  getcenters(): Observable<Center[]> {
    return this.http.get<Center[]>('/api/centers');
  }
  getcenterById(center): Observable<Center> {

    return this.http.get<Center>(`/api/center/${center}`);
  }
 

  

 




}
