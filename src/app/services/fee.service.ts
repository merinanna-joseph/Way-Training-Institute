import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Fee } from '../shared/models/fee.model';


@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private http: HttpClient) { }

  addFee(fee: Fee): Observable<Fee> {
    return this.http.post<Fee>('/api/fee', fee);
  }

  getFees(): Observable<Fee[]> {
    return this.http.get<Fee[]>('/api/fees');
  }

  countFees(): Observable<number> {
    return this.http.get<number>('/api/fee/count');
  }

  getFee(fee: Fee): Observable<Fee> {
    return this.http.get<Fee>(`/api/fee/${fee._id}`);
  }
  getFeeById(fee): Observable<Fee> {
    return this.http.get<Fee>(`/api/fee/${fee}`);
  }



  editFee(fee: Fee,auth_token:string): Observable<any> {

    return this.http.put(`/api/fee/${fee._id}`, fee, { responseType: 'text' });
  }
  editFeeById(fee): Observable<any> {

    return this.http.put(`/api/fee/${fee}`, fee, { responseType: 'text' });
  }


  deleteFee(fee: Fee): Observable<any> {

    return this.http.delete(`/api/fee/${fee._id}`, { responseType: 'text' });
  }

  getFeesByCourse(): Observable<Fee[]> {
    return this.http.get<Fee[]>('/api/fees/getFeesByCourse');
  }

}
