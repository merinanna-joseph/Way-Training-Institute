import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Student } from '../shared/models/student.model';
import { Test } from '../shared/models/testimage.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  addStudent(student: Student): Observable<Student> {

    return this.http.post<Student>('/api/student', student);
  }
  addTestImage(test:Test): Observable<Student> {
    const data=new FormData()
    // console.log("student passport",student.passport)
    // alert(test.imagePath)
    data.append("title",test.title)
    data.append('image',test.imagePath)
    // alert("data"+data);
    // console.log("data in service",data)

    return this.http.post<Test>('/api/uploadtestimage', data);
  }
  getTestImages(): Observable<Student[]> {
    return this.http.get<Test[]>('/api/getuploadtestimage');
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('/api/students');
  }

  countStudents(): Observable<number> {
    return this.http.get<number>('/api/student/count');
  }

  getStudent(student: Student): Observable<Student> {
    // alert("student")
    return this.http.get<Student>(`/api/student/${student._id}`);
  }

  editStudent(student: Student): Observable<any> {
    return this.http.put(`/api/student/${student._id}`, student, { responseType: 'text' });
  }

  deleteStudent(student: Student): Observable<any> {

    return this.http.delete(`/api/student/${student._id}`, { responseType: 'text' });
  }

  getStudentByCourseandFees(student: Student): Observable<Student> {
    return this.http.get<Student>(`/api/student/getStudentByCourseandFees/${student._id}`);
  }

  uploadImageOfIdProof(image)
  {
    // alert(image)
    const data=new FormData()
    data.append('image',image)
    return this.http.post<Student>('/api/upload', data);
  }
  uploadPhoto(image,studentid,type)
  {
    // alert(image)
    const data=new FormData()
    data.append('image',image)
    return this.http.post<Student>(`/api/student/upload/${studentid}/${type}`, data);
  }

  uploadSecondaryCertificate(image,studentid,type)
  {
    // alert(image)
    const data=new FormData()
    data.append('image',image)
    return this.http.post<Student>(`/api/student/upload/${studentid}/${type}`, data);
  }
  uploadHigherSecondaryCertificate(image,studentid,type)
  {
    // alert(image)
    let name:string="divya"
    const data=new FormData()
    data.append('image',image)
    return this.http.post<Student>(`/api/student/upload/${studentid}/${type}`, data);
  }
  uploadOtherCertificate(multipleimages,studentid,type)
{
  const data=new FormData();
  for(let img of multipleimages)
  {
    data.append('files',img);
  }
  return this.http.post<Student>(`/api/student/uploads/${studentid}/${type}`, data);
}
getStudentsWithALLDetails(): Observable<Student[]> {
  return this.http.get<Student[]>('/api/students/getStudentsWithALLDetails');
}
getSubmittedStudentsWithALLDetails(): Observable<Student[]> {
  return this.http.get<Student[]>('/api/students/getSubmittedStudentsWithALLDetails');
}
getSavedStudentsWithALLDetails(): Observable<Student[]> {
  return this.http.get<Student[]>('/api/students/getSavedStudentsWithALLDetails');
}
getClosedStudentsWithALLDetails(): Observable<Student[]> {
  return this.http.get<Student[]>('/api/students/getClosedStudentsWithALLDetails');
}
getStudentByFeeId(student: Student): Observable<Student> {
  return this.http.get<Student>(`/api/student/getStudentByFeeId/${student._id}`);
}
editStudentByTallyReg(student: Student): Observable<any> {
  return this.http.put(`/api/student/editStudentByTallyReg/${student._id}`, student);
}
deleteCollectionflowByStudent(student: Student): Observable<any> {

  return this.http.delete(`/api/student/deleteCollectionflowByStudent/${student._id}`, { responseType: 'text' });
}
getCountOfStudentswithCourse(student: Student): Observable<number> {
  return this.http.get<number>(`/api/student/getCountOfStudentswithCourse/${student.courseID}`);
}
countSubmittedStudent():Observable<number> {
  return this.http.get<number>('/api/students/countSubmittedStudent');
  // return this.http.get<number>('/api/student/count');
}
getStudentByUsername(student: Student): Observable<Student> {
  // alert("student")
  return this.http.get<Student>(`/api/student/studentbyusername/${student.username}`);
}
deleteImagepathfromdirectory(img_path,img_name,img_id){
  // alert("student");
  // let image = {
  //   path:img_path,
  // };
  let image = {
    id:img_id,
    name:img_name,
    path:img_path,
  };
  console.log(image,"img")
  return this.http.post<any>(`/api/student/deleteImagepathfromdirectory`,image);
}
countStudentbyCenters():Observable<any[]> {
  return this.http.get<any[]>('/api/students/countStudentbyCenters');
  // return this.http.get<number>('/api/student/count');
}
}

