import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule,CommonModules } from './app-routing.module';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AuthGuardStaff } from './services/auth-guard-staff.service';
import { AuthGuardSuperAdmin } from './services/auth-guard-super-admin.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CourseService } from './services/course.service';
import { CalleventService } from './services/callevent.service';
import { LeadService } from './services/lead.service';
import { LeadassignmentService } from './services/leadassignment.service';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StaffLayoutComponent } from './layouts/staff-layout/staff-layout.component';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {NgxPrintModule} from 'ngx-print';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
// import { TestImageComponent } from './test-image/test-image.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { ReportBookComponent } from './report-book/report-book.component';
import { ReportCertificateComponent } from './report-certificate/report-certificate.component';
import { ReportTransportComponent } from './report-transport/report-transport.component';
import { TestPrintComponent } from './test-print/test-print.component';
import { CourseandbranchViewComponent } from './courseandbranch-view/courseandbranch-view.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    StaffLayoutComponent,
    CommonModules,
    ConfirmationDialogComponent,
    ReportBookComponent,
    ReportCertificateComponent,
    ReportTransportComponent,
    TestPrintComponent,
    CourseandbranchViewComponent,
    
    
    

    // TestImageComponent,




    ],
  imports: [

    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    CommonModule,
    NgxPrintModule,
    PdfViewerModule,
    Ng2TelInputModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: [MYGLOBALS.BASE_URL]
      }
    }),
  ],
  providers: [
    AuthGuardAdmin,
    AuthGuardStaff,
    AuthGuardSuperAdmin,
    AuthService,
    CourseService,
    CalleventService,
    LeadService,
    LeadassignmentService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
