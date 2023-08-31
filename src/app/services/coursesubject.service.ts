import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Coursesubject } from '../shared/models/coursesubject.model';

@Injectable({
  providedIn: 'root'
})
export class CourseSubjectService {

  constructor(private http: HttpClient) { }
  addCoursesubject(coursesubject: Coursesubject): Observable<Coursesubject> {
    console.log("coursesubject",coursesubject)
    return this.http.post<Coursesubject>('/api/coursesubject', coursesubject);
  }
  getSubjectById(csubID): Observable<Coursesubject> {

    return this.http.get<Coursesubject>(`/api/coursesubject/${csubID}`);
  }
  editCoursesubject(coursesubject: Coursesubject): Observable<any> {
    return this.http.put(`/api/coursesubject/${coursesubject._id}`, coursesubject, { responseType: 'text' });
  }
  deleteCoursesubject(coursesubject: Coursesubject): Observable<any> {

    return this.http.delete(`/api/coursesubject/${coursesubject._id}`, { responseType: 'text' });
  }
  // uploadOtherCertificate(multipleimages)
  // {
  //   const data=new FormData();
  //   for(let img of multipleimages)
  //   {
  //     data.append('files',img);
  //   }
  //   return this.http.post<Coursesubject>('/api/student/uploads', data);
  // }

  getCoursesubjectsByCourse(courseID,yearIndex,semIndex): Observable<Coursesubject[]> {
    return this.http.get<Coursesubject[]>(`/api/coursesubjects/getCoursesubjectsByCourse/${courseID}/${yearIndex}/${semIndex}`);
  }

}
