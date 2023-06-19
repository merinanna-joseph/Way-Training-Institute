import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { BoardOrUniversity } from '../shared/models/boardoruniversity.model';

@Injectable({
  providedIn: 'root'
})
export class BoardOrUniversityService {

  constructor(private http: HttpClient) { }
  
  addBoardOrUniversity(BoardOrUniversity: BoardOrUniversity): Observable<BoardOrUniversity> {
    return this.http.post<BoardOrUniversity>('/api/boardOrUniversity', BoardOrUniversity);
  }

  getBoardOrUniversitys(): Observable<BoardOrUniversity[]> {
    return this.http.get<BoardOrUniversity[]>('/api/BoardOrUniversitys');
  }

  countBoardOrUniversitys(): Observable<number> {
    return this.http.get<number>('/api/BoardOrUniversity/count');
  }
 
  getBoardOrUniversity(BoardOrUniversity: BoardOrUniversity): Observable<BoardOrUniversity> {
    return this.http.get<BoardOrUniversity>(`/api/BoardOrUniversity/${BoardOrUniversity._id}`);
  }

  
  editBoardOrUniversity(BoardOrUniversity: BoardOrUniversity,auth_token:string): Observable<any> {
   
    return this.http.put(`/api/BoardOrUniversity/${BoardOrUniversity._id}`, BoardOrUniversity, { responseType: 'text' });
  }
  
  
  deleteBoardOrUniversity(BoardOrUniversity: BoardOrUniversity): Observable<any> {
  
    return this.http.delete(`/api/BoardOrUniversity/${BoardOrUniversity._id}`, { responseType: 'text' });
  }
 
 

}
