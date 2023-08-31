import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Course } from '../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>('/api/course', course);
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses');
  }
  getAllCourseandFee(): Observable<Course> {
    return this.http.get<Course>('/api/courses/getAllCourseandFee');
  }

  getAllCourseWithBoardname(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/course/getAllCourseWithBoardname');
  }

  countCourses(): Observable<number> {
    return this.http.get<number>('/api/course/count');
  }

  getCourse(course: Course): Observable<Course> {
    return this.http.get<Course>(`/api/course/${course._id}`);
  }
  getCourseById(course): Observable<Course> {
    return this.http.get<Course>(`/api/course/${course}`);
  }


  editCourse(course: Course): Observable<any> {

    return this.http.put(`/api/course/${course._id}`, course, { responseType: 'text' });
  }



  deleteCourse(course: Course): Observable<any> {

    return this.http.delete(`/api/course/${course._id}`, { responseType: 'text' });
  }

  getSingleCourseandFee(course: Course): Observable<Course> {
    return this.http.get<Course>(`/api/course/getSingleCourseandFee/${course._id}`);
  }
  getCoursesWithNamewithBranch(course: Course): Observable<Course> {
    return this.http.get<Course>(`/api/courses/getCoursesWithNamewithBranch/${course.name}/${course.boardOrUniversity}/${course.courseType}/${course.branch}/${course.centers}`);
  }
  getCoursesWithNamewithoutBranch(course: Course): Observable<Course> {
    return this.http.get<Course>(`/api/courses/getCoursesWithNamewithoutBranch/${course.name}/${course.boardOrUniversity}/${course.courseType}/${course.centers}`);
  }
  getCoursesByUniversityId(boardoruniversityID: string): Observable<Course[]> {
    return this.http.get<Course[]>(`/api/courses/getCoursesByUniversityId/${boardoruniversityID}`);
  }
  getCountOfCourseswithCourseId(course: Course): Observable<number> {
    return this.http.get<number>(`/api/courses/getCountOfCourseswithCourseId/${course}`);
  }
  getCountOfCourseswithBranchId(course: Course): Observable<number> {
    return this.http.get<number>(`/api/courses/getCountOfCourseswithBranchId/${course}`);
  }

  getAllCourseandFeeByCenter(center): Observable<Course> {
    return this.http.get<Course>(`/api/courses/getAllCourseandFeeByCenter/${center}`);
  }

  getCoursesByUniversityIdandCenter(boardoruniversityID: string,centername:string): Observable<Course[]> {
    return this.http.get<Course[]>(`/api/courses/getCoursesByUniversityIdandCenter/${boardoruniversityID}/${centername}`);
  }
}
