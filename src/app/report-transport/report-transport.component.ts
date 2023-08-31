import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CollectionflowService } from '../services/collectionflow.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-report-transport',
  templateUrl: './report-transport.component.html',
  styleUrls: ['./report-transport.component.css']
})
export class ReportTransportComponent implements OnInit {
  transports=[];
  constructor(public auth:AuthService,
    public toast: ToastComponent,
    public collectionFlowService:CollectionflowService,
) { }

  ngOnInit(): void {
    this.getallTrasport();
  }
  getallTrasport(){
    this.collectionFlowService.getallTransport().subscribe(
      data=>{
        for(let i=0;i<data.length;i++){
          if(data[i].remarks!='NIL')
          this.transports.push(data[i]) ;

        }
        console.log("transports",this.transports);


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
        link.download = 'Transportation Report' +".xls";
        link.href = uri + base64(format(template, ctx))
        link.click();
    }

}
