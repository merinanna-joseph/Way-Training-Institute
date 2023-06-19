import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Studymaterial } from '../shared/models/studymaterial.model';

@Injectable({
  providedIn: 'root'
})
export class StudymaterialService {

  constructor(private http: HttpClient) { }
  addStudymaterial(studymaterial: Studymaterial): Observable<Studymaterial> {
    console.log("studymaterial",studymaterial)
    return this.http.post<Studymaterial>('/api/studymaterial', studymaterial);
  }
  getStudymaterialById(csubID): Observable<Studymaterial> {

    return this.http.get<Studymaterial>(`/api/studymaterial/${csubID}`);
  }
  editStudymaterial(studymaterial: Studymaterial): Observable<any> {
    return this.http.put(`/api/studymaterial/${studymaterial._id}`, studymaterial, { responseType: 'text' });
  }
  deleteStudymaterial(studymaterial: Studymaterial): Observable<any> {

    return this.http.delete(`/api/studymaterial/${studymaterial._id}`, { responseType: 'text' });
  }
  uploadOtherCertificate(multipleimages,studymaterialid,type)
  {
    // let i='pp';
    const data=new FormData();
    for(let img of multipleimages)
    {
      data.append('files',img);
    }
    // data.append('new',i)
    return this.http.post<Studymaterial>(`/api/studymaterial/studymaterialsuploads/${studymaterialid}/${type}`, data);
  }

  getStudymaterialsBySubject(subjectID): Observable<Studymaterial[]> {
    return this.http.get<Studymaterial[]>(`/api/studymaterials/getStudymaterialsBySubject/${subjectID}`);
  }
  deleteImagepathfromdirectory(img_path,img_name,img_id){
    // alert("student");
    let image = {
      id:img_id,
      name:img_name,
      path:img_path,
    };
    return this.http.post<any>(`/api/studymaterial/deleteImagepathfromdirectory`,image);
  }
  getCountofStudymaterialBysubjectid(studymaterial: Studymaterial): Observable<number> {
    return this.http.get<number>(`/api/studymaterial/getCountofStudymaterialBysubjectid/${studymaterial.subject}`);
  }
}
