
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Invoice } from '../shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>('/api/invoice', invoice);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>('/api/invoices');
  }

  countInvoices(): Observable<number> {
    return this.http.get<number>('/api/invoice/count');
  }

  getInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.get<Invoice>(`/api/invoice/${invoice._id}`);
  }


  editInvoice(invoice: Invoice): Observable<any> {

    return this.http.put(`/api/invoice/${invoice._id}`, invoice, { responseType: 'text' });
  }



  deleteInvoice(invoice: Invoice): Observable<any> {

    return this.http.delete(`/api/invoice/${invoice._id}`, { responseType: 'text' });
  }

  getinvoicesWithStudentId(studentID: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`/api/invoices/getinvoicesWithStudentId/${studentID}`);
  }
  getInvoiceByStudentID(invoice: Invoice): Observable<Invoice> {
    return this.http.get<Invoice>(`/api/invoice/getInvoiceByStudentID/${invoice._id}`);
  }
  getinvoicesWithAllStudents(year): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`/api/invoices/getinvoicesWithAllStudents/${year}`);
  }
  getinvoicesWithAllStudents_last2years(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>('/api/invoices/getinvoicesWithAllStudents_last2years');
  }
  getAllInvoicesBtwDateswithStudents(sDate,eDate): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`/api/invoices/getAllInvoicesBtwDateswithStudents/${sDate}/${eDate}`);
  }
  getinvoicesWithAllStudentswithcommutation(sDate,eDate): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`/api/invoices/getinvoicesWithAllStudentswithcommutation/${sDate}/${eDate}`);
  }
  getAllInvoicesBtwDateswithStudentsdemo(sDate,eDate,paymentmode,university,intake,coursename,coursebranch,
    coursetype): Observable<Invoice[]> {
       return this.http.get<Invoice[]>(`/api/invoices/getAllInvoicesBtwDateswithStudentsdemo/${sDate}
    /${eDate}/${paymentmode}/${university}/${intake}/${coursename}/${coursebranch}/${coursetype}`);
  }
  getAllInvoicesBtwDateswithStudentsdemoWithCourseonly
  (sDate,eDate,paymentmode,university,intake,coursename,coursetype): Observable<Invoice[]> {
       return this.http.get<Invoice[]>(`/api/invoices/getAllInvoicesBtwDateswithStudentsdemo/${sDate}
    /${eDate}/${paymentmode}/${university}/${intake}/${coursename}/${coursetype}`);
  }

  getAllInvoicesBtwDateswithStudentsdemots(sDate,eDate,paymentmode,university,intake,coursename,coursebranch,
    coursetype): Observable<Invoice[]> {
       return this.http.get<Invoice[]>(`/api/invoices/getAllInvoicesBtwDateswithStudentsdemots/${sDate}
    /${eDate}/${paymentmode}/${university}/${intake}/${coursename}/${coursebranch}/${coursetype}`);
  }
  getAllInvoicesBtwDateswithStudentswithonlycoursenamets(sDate,eDate,paymentmode,university,intake,coursename,coursetype): Observable<Invoice[]> {
       return this.http.get<Invoice[]>(`/api/invoices/getAllInvoicesBtwDateswithStudentsdemots/${sDate}
    /${eDate}/${paymentmode}/${university}/${intake}/${coursename}/${coursetype}`);
  }

}
