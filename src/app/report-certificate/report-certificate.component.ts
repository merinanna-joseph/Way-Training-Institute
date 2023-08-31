import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CollectionflowService } from '../services/collectionflow.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-report-certificate',
  templateUrl: './report-certificate.component.html',
  styleUrls: ['./report-certificate.component.css']
})
export class ReportCertificateComponent implements OnInit {
  certificates=[];

  constructor(public auth:AuthService,
    public toast: ToastComponent,
    public collectionFlowService:CollectionflowService,
) { }

  ngOnInit(): void {
    this.getallCertificate();
  }
  getallCertificate(){
    this.collectionFlowService.getallCertificate().subscribe(
      data=>{
        this.certificates = data;
        console.log("CERTS",this.certificates);


      });
    }

    clickToExport(){
      var uri = 'data:application/vnd.ms-excel;base64,',
          template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns=http://www.w3.org/TR/REC-html40><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
          base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)))
          },
          format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
              return c[p];
            })
          }
        var toExcel = document.getElementById("tblData").innerHTML;
        var ctx = {

          table: toExcel
        };
        var link = document.createElement("a");
        link.download = 'Certificate Report' +".xls";
        link.href = uri + base64(format(template, ctx))
        link.click();
    }


}
