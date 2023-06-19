import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Booklibrary } from '../shared/models/booklibrary.model';

@Injectable({
  providedIn: 'root'
})
export class BookLibraryService {

  constructor(private http: HttpClient) { }

  addBookLibrary(BookLibrary: Booklibrary): Observable<Booklibrary> {
    return this.http.post<Booklibrary>('/api/BookLibrary', BookLibrary);
  }

  getBookLibrarys(): Observable<Booklibrary[]> {
    return this.http.get<Booklibrary[]>('/api/BookLibrarys');
  }
  getBookLibraryById(BookLibrary): Observable<Booklibrary> {

    return this.http.get<Booklibrary>(`/api/BookLibrary/${BookLibrary}`);
  }
  deletebyBookLibraryID(BookLibrary: Booklibrary): Observable<any> {

    return this.http.delete(`/api/BookLibrary/${BookLibrary}`, { responseType: 'text' });
  }
  getAllBooklibraryWithALLDetails(): Observable<Booklibrary[]> {
    return this.http.get<Booklibrary[]>('/api/BookLibrarys/getAllBooklibraryWithALLDetails');
  }

  getBooklibraryWithId(BoardOrUniversityId): Observable<Booklibrary> {
    return this.http.get<Booklibrary>(`/api/BookLibrary/getBooklibraryWithId/${BoardOrUniversityId}`);
  }
  getBooklibraryWithNameBranchType(cname,ctype,cbranch,cuniversity): Observable<Booklibrary> {
    return this.http.get<Booklibrary>(`/api/BookLibrarys/getBooklibraryWithNameBranchType/${cname}/${ctype}/${cbranch}/${cuniversity}`);
  }
  getBooklibraryWithNameType(cname,ctype,cuniversity): Observable<Booklibrary> {
    return this.http.get<Booklibrary>(`/api/BookLibrarys/getBooklibraryWithNameType/${cname}/${ctype}/${cuniversity}`);
  }
}
