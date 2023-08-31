import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Coursename } from '../shared/models/coursename.model';

@Injectable({
  providedIn: 'root'
})
export class CourseNameService {

  constructor(private http: HttpClient) { }

  addCourse(course: Coursename): Observable<Coursename> {
    return this.http.post<Coursename>('/api/coursename', course);
  }

  getCourses(): Observable<Coursename[]> {
    return this.http.get<Coursename[]>('/api/coursenames');
  }
  getCourseById(course): Observable<Coursename> {

    return this.http.get<Coursename>(`/api/coursename/${course}`);
  }
  deletebyCoursenameID(course: Coursename): Observable<any> {

    return this.http.delete(`/api/coursename/${course}`, { responseType: 'text' });
  }

  // getAllCourseandFee(): Observable<Course> {
  //   return this.http.get<Course>('/api/courses/getAllCourseandFee');
  // }

  // getAllCourseWithBoardname(): Observable<Course[]> {
  //   return this.http.get<Course[]>('/api/course/getAllCourseWithBoardname');
  // }

  // countCourses(): Observable<number> {
  //   return this.http.get<number>('/api/course/count');
  // }

  // getCourse(course: Course): Observable<Course> {
  //   return this.http.get<Course>(`/api/course/${course._id}`);
  // }


  // editCourse(course: Course): Observable<any> {

  //   return this.http.put(`/api/course/${course._id}`, course, { responseType: 'text' });
  // }



  // deleteCourse(course: Course): Observable<any> {

  //   return this.http.delete(`/api/course/${course._id}`, { responseType: 'text' });
  // }

  // getSingleCourseandFee(course: Course): Observable<Course> {
  //   return this.http.get<Course>(`/api/course/getSingleCourseandFee/${course._id}`);
  // }

  // getCoursesByUniversityId(boardoruniversityID: string): Observable<Course[]> {
  //   return this.http.get<Course[]>(`/api/courses/getCoursesByUniversityId/${boardoruniversityID}`);
  // }

}
