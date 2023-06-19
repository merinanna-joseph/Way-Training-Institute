import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FeeflowService } from '../services/feeflow.service';
import { InvoiceService } from '../services/invoice.service';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { CourseService } from '../services/course.service';
import { BoardOrUniversityService } from '../services/boardoruniversity.service';
import { Course } from '../shared/models/course.model';
import { BoardOrUniversity } from '../shared/models/boardoruniversity.model';
import { Invoice } from '../shared/models/invoice.model';
import { Chart } from 'chart.js';
import { CenterService } from '../services/center.service';

@Component({
  selector: 'app-dashboard-candidate',
  templateUrl: './dashboard-candidate.component.html',
  styleUrls: ['./dashboard-candidate.component.css']
})
export class DashboardCandidateComponent implements OnInit {



  currentYear = (new Date()).getFullYear();

  filter_year = [];
  selectedIndex: number;
  showNext:boolean;
  showPrevious:boolean;

 
  
  //filters

  allCenters: any[];

  
// code change after addding new centers into arrays
  total_students_count_array = [];
  // public pieChartLabels:string[] = ['Abu-Dhabi', 'Ajman'];
  public pieChartLabels:string[] = [];

  public pieChartData:any[] = [];
  public pieChartType:any= 'pie';

  to_pay_balance_fee_allCenters = [];
  allcenters_total_currentyear_paid_count = [];
  lastpaid_studentfees_all = [];
  graphinvoice_all = [];

  showBalanceFees:boolean;
  showCollectedFees:boolean;
  graph_centername;
  // events
  public chartClicked(e:any):void {
    // console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  //graph
  public lineBigDashboardChartData:Array<any>;
  public lineBigDashboardChartOptions:any;
  public lineBigDashboardChartLabels:Array<any>;
  public lineBigDashboardChartColors:Array<any>
  public lineBigDashboardChartType;
  public gradientFill;
  public chartColor;
  public canvas : any;
  public ctx;
  public gradientStroke;
 
  dataArray: any = [];
  valuearray_center2 = [];
  pieDisplay:boolean = false;
  chartData = {
    items: [
      {
        label: 'Apples',
        data: [0, 80, 45, 100],
        backgroundColor: '#1a0b66',
        borderColor: 'rgb(40,100,200)',
        fill: true,
        lineTension: 0,
        radius: 5
      },
      // {
      //   label: 'Oranges',
      //   data: [30, 90, 111, 20],
      //   backgroundColor: 'rgba(75,10,125,.5)',
      //   borderColor: 'rgb(75,10,125)',
      //   fill: true,
      //   lineTension: 0.2,
      //   radius: 5
      // }
    ]
  };

  constructor(
    public auth:AuthService,
    public studentService:StudentService,
    public invoiceService:InvoiceService,
    public feeflowService:FeeflowService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent,
    public courseService: CourseService,
    public boardoruniversityService: BoardOrUniversityService,
    public centerService:CenterService,

  ) { }
  lineBigDashboardChartLabelsData : Array<number> = [0,0,0,0,0,0,0];
  
  groupByMonth(objectArray:any[]) {
    let labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var cur_year_month = labels[new Date().getMonth()] + "-"+ new Date().getFullYear();
    // console.log(objectArray,"objarray")
    return objectArray.reduce(function (acc, obj:Invoice) {
      let key = "";

        key = labels[new Date(""+obj.remittedDate
        ).getMonth()]  + "-"+new Date(""+obj.remittedDate
        ).getFullYear().toString().substr(-2);    ;


      if (!acc[key]) {
        acc[key] = 0;

      }

      acc[key] = acc[key] + Number(obj.total_remitted_fee);
      // console.log("acc  ", acc)
      return acc
    }, {})
  }
  // groupByDay(objectArray:any[]) {
  //   let labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  //   return objectArray.reduce(function (acc, obj:Invoice) {
  //     let key = "";
  //     key = labels[new Date(""+obj.remittedDate).getMonth()]  + "-"+new Date(""+obj.remittedDate).getDate();
  //     if (!acc[key]) {
  //       acc[key] = 0;
  //     }
  //     acc[key] = acc[key] + Number(obj.total_remitted_fee);
  //     return acc
  //   }, {})
  // }

  lineBigDashboardChartLabels1 = ["","","","","","",""];
 
  chartWeekLabels = ["","","","","","",""];
  getMonthArray(){
    var currentMonth = new Date().getMonth();
    var currYear = new Date().getFullYear();
    var currentYear  = currYear.toString().substr(-2);
    for(let i=6;i>=0;i--){
      this.lineBigDashboardChartLabels1[i] = this.lineBigDashboardChartLabels[currentMonth] + "-"+currentYear;
      // console.log(this.lineBigDashboardChartLabels1,"lineBigDashboardChartLabels1")
      if(currentMonth < 1){
        currentMonth = 12;
        currentYear = String(parseInt(currentYear) - 1);
      }
      currentMonth = currentMonth - 1;

    }

  }
  // getWeekArray(){
  //   var currentDate = new Date();
  //   for(let i=6;i>=0;i--){
  //     this.chartWeekLabels[i] = this.lineBigDashboardChartLabels[currentDate.getMonth()] + "-"+currentDate.getDate();
  //     currentDate.setDate(currentDate.getDate() - 1);
  //   }
  //   console.log(this.chartWeekLabels, "  chartweeklabels")
  // }


 
  ngOnInit(): void {
    // this.total_currentyear_paid_count = Number(localStorage.getItem('bothcenters_paid'));
    // this.center1_currentyear_paid_count = Number(localStorage.getItem('center1_paid'));
    // this.center2_currentyear_paid_count = Number(localStorage.getItem('center2_paid'));
    // this.to_pay_balance_fee_bothCenters = Number(localStorage.getItem('bothcenter_outstanding'));
    // this.to_pay_balance_fee_center1 = Number(localStorage.getItem('center1_outstanding'));
    // this.to_pay_balance_fee_center2 = Number(localStorage.getItem('center2_outstanding'));

    // if(JSON.parse(localStorage.getItem('centers_paid?'))){
    //   this.showTotalCollectedFees = true;
    //   this.showTotalBalanceFees = false;
    // }else if(JSON.parse(localStorage.getItem('centers_outstanding?'))){
    //   this.showTotalBalanceFees = true;
    //   this.showTotalCollectedFees = false;
    // }

    // if(JSON.parse(localStorage.getItem('center1_paid?'))){
    //   this.showTotalCollectedCenter1Fees = true;
    //   this.showTotalBalanceCenter1Fees = false;
    // }else if(JSON.parse(localStorage.getItem('center1_outstanding?'))){
    //   this.showTotalBalanceCenter1Fees = true;
    //   this.showTotalCollectedCenter1Fees = false;
    // }

    // if(JSON.parse(localStorage.getItem('center2_paid?'))){
    //   this.showTotalCollectedCenter2Fees = true;
    //   this.showTotalBalanceCenter2Fees = false;
    // }else if(JSON.parse(localStorage.getItem('center2_outstanding?'))){
    //   this.showTotalBalanceCenter2Fees = true;
    //   this.showTotalCollectedCenter2Fees = false;
    // }

    this.getCenters();
    //count of students
    this.studentService.countStudentbyCenters().subscribe(
      datacount => {

        for(var i=0;i< datacount.length;i++){
          this.total_students_count_array.push(datacount[i]);
          if( i != 0){
            this.pieChartData.push(datacount[i].count);
           this.pieChartLabels.push(datacount[i]._id);
          }
         
        }
        setTimeout(() => {
          this.pieDisplay = true;
        }, 400);

        console.log(this.pieChartLabels,"  ",this.pieChartData)
      }
      );
     //count of students
      this.chartColor = "#FFFFFF";
      this.lineBigDashboardChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   
           //for bottom graph with only last 2 year paid
        this.invoiceService.getinvoicesWithAllStudents_last2years().subscribe(
          data=>{
            this.graphinvoice_all.push(data);

            for(var k = 0;k<this.total_students_count_array.length;k++){
              let last_data = [];
              if(this.total_students_count_array[k]._id != 'ALL'){
                for(var x = 0;x< data.length;x++){
                
                  if(data[x].studentId.centers == this.total_students_count_array[k]._id){
                    last_data.push(data[x]);
  
                  }
                
              
                
              }
              this.graphinvoice_all.push(last_data);
              }

             
 
            }

            //graph
           
            this.graph_centername = 'ALL';
            let index = 0;
            this.onCardClick(index,this.graph_centername)
          }
           );
           
         //for bottom graph

         // for outstanding fees 
          this.feeflowService.getFeeflowsWithAllGroupedStudents().subscribe(
            data=>{
              console.log(data,"grouped last feeflow")
              for(var k = 0;k<this.allCenters.length;k++){
                let last_data = [];
                for(var i in data){
                  for(var j in data[i].items){
                 
                      if(data[i].items[j].studentId.centers == this.allCenters[k].center){
                        last_data.push(data[i].items[j]);
  
                      }
              
                   
                    for(let k=0;k<  data[i].items[j].fee_per_year.length;k++){
                      if(this.filter_year.length <= 0){
                        this.filter_year.push(data[i].items[j].fee_per_year[k].year);
                      }else{
                        for(let l = 0;l < this.filter_year.length; l++){
                          if(this.filter_year.indexOf(data[i].items[j].fee_per_year[k].year) <= -1){
                            this.filter_year.push(data[i].items[j].fee_per_year[k].year);
                          }
                        }
                      }
                    }
  
                  }
                }
                this.lastpaid_studentfees_all.push(last_data);
                console.log(this.filter_year,"filter year")
              }

             
              this.selectedIndex = 0;
              this.showNext = true;
              this.showPrevious = true;
              this.filter_year.sort();
              for(let h=0;h< this.filter_year.length;h++){
                let year = this.filter_year[h];
                let splityears = [];
                let year1;

                if(year){
                  splityears = year.split("-");
                }else{
                  splityears.push(this.currentYear)
                }

                year1 = splityears[0];

                if(year1 == this.currentYear){
                  this.selectedIndex = h;

                }

              }
              // let index = 0;
              this.viewBalance(this.filter_year[this.selectedIndex]);

              // if(!this.total_currentyear_paid_count && !this.to_pay_balance_fee_bothCenters){
              //   this.viewTotalBalanceFees(this.filter_year[this.selectedIndex]);
              // }
              // if(!this.center1_currentyear_paid_count && !this.to_pay_balance_fee_center1){
              //   this.viewTotalCenter1BalanceFees(this.filter_year[this.selectedIndex]);
              // }
              // if(!this.center2_currentyear_paid_count && !this.to_pay_balance_fee_center2){
              //   this.viewTotalCenter2BalanceFees(this.filter_year[this.selectedIndex]);

              // }
              // if(!this.center3_currentyear_paid_count && !this.to_pay_balance_fee_center3){
              //   this.viewTotalCenter3BalanceFees(this.filter_year[this.selectedIndex]);

              // }
            }
          );
        // for outstanding fees
  }


  getCenters(){
   
    this.allCenters = [];
    this.getAllCenters();
  }
  getAllCenters(){
    this.centerService.getcenters().subscribe(
      data => {
        for(var i in data){
          this.allCenters.push(data[i]);

        }
  
      }
    )
  }

  viewBalance(year){
    this.to_pay_balance_fee_allCenters = [];
    this.showCollectedFees = false;
    this.to_pay_balance_fee_allCenters[0] = {'center': 'ALL','balance': 0};

    for(var m = 0;m<this.lastpaid_studentfees_all.length;m++){
      let balance = 0;

      for(var i in this.lastpaid_studentfees_all[m]){
        for(var j in this.lastpaid_studentfees_all[m][i].fee_per_year){
          if(this.lastpaid_studentfees_all[m][i].fee_per_year[j].year == year){
            balance = balance + this.lastpaid_studentfees_all[m][i].fee_per_year[j].balance_fee;
          }


        }


       }
       if(this.lastpaid_studentfees_all[m][i]){
        this.to_pay_balance_fee_allCenters.push({'center': this.lastpaid_studentfees_all[m][i].studentId.centers,'balance': balance});

       }
       if(m == (this.lastpaid_studentfees_all.length - 1)){
        let bal = 0;
        for(var i in this.to_pay_balance_fee_allCenters){
          bal = bal + this.to_pay_balance_fee_allCenters[i].balance;
        }
        this.to_pay_balance_fee_allCenters[0] = {'center': 'ALL','balance': bal};
        this.showBalanceFees =  true;
       }
    }
   }
  viewCollectedFees(year){
    // alert("yes")
    this.showBalanceFees = false;
    this.allcenters_total_currentyear_paid_count = [];
    this.invoiceService.getinvoicesWithAllStudents(year).subscribe(
      data => {
        this.allcenters_total_currentyear_paid_count[0] = {'center': 'ALL','paid': 0};

        for(var y =0;y<this.allCenters.length;y++){
          let total_paid = 0;
          let center = this.allCenters[y].center;
          for(var x =0;x<data.length;x++){
            if(this.allCenters[y].center == data[x].studentId.centers){
              total_paid = total_paid + data[x].total_remitted_fee;

            }
          }
            this.allcenters_total_currentyear_paid_count.push({'center': center,'paid': total_paid});
            if(y == (this.allCenters.length - 1)){
             let paid = 0;
             for(var i in this.allcenters_total_currentyear_paid_count){
               paid = paid + this.allcenters_total_currentyear_paid_count[i].paid;
             }
             this.allcenters_total_currentyear_paid_count[0] = {'center': 'ALL','paid': paid};
             this.showCollectedFees =  true;
            }
        }
        
          // this.currentyear_paid.reverse();
          // this.card1_click = true;

       });
   }

 

      next() {
        this.showPrevious = true;
        this.selectedIndex++;
        if(this.selectedIndex >= this.filter_year.length){
          this.selectedIndex = this.filter_year.length-1;
          this.showNext = false;
         }
         if(this.showCollectedFees){
          this.viewCollectedFees(this.filter_year[this.selectedIndex]);
         }
        
         if(this.showBalanceFees){
          this.viewBalance(this.filter_year[this.selectedIndex]);
         }
        

     }

     previous() {
      this.showNext = true;
      this.selectedIndex--;
         if(this.selectedIndex <= 0){
          this.selectedIndex = 0;
          this.showPrevious = false;
         }
         if(this.showCollectedFees){
          this.viewCollectedFees(this.filter_year[this.selectedIndex]);
         }
        
         if(this.showBalanceFees){
          this.viewBalance(this.filter_year[this.selectedIndex]);
         }


     }
   
   
   
    
   
   

   onCardClick(index,center){
   
    this.graph_centername = center;
    let groupedLeads:any = this.groupByMonth(this.graphinvoice_all[index]);
    this.getMonthArray();
    this.lineBigDashboardChartLabelsData = [0,0,0,0,0,0,0];
    let i=0;
    this.lineBigDashboardChartLabels1.forEach(label => {
      if(groupedLeads[label]){
        this.lineBigDashboardChartLabelsData[i] = parseInt(""+groupedLeads[label]);
      }

      i++;
    });
    setTimeout(() => {
      this.chartColor = "#37386e";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");
    // faebeb
    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
    this.lineBigDashboardChartData = [
      {
        label: "Paid",

        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,

        borderWidth: 2,
        data: this.lineBigDashboardChartLabelsData
      }
    ];
    this.lineBigDashboardChartColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBorderColor: this.chartColor,
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: this.chartColor,
      }
    ];
    this.lineBigDashboardChartOptions = {


        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 0,
                bottom: 0
            }
        },
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: '#d5e7f7',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        legend: {
            position: "bottom",
            fillStyle: "#FFF",
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "#663333",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 10
                },
                gridLines: {
                    drawTicks: true,
                    drawBorder: false,
                    display: true,
                    color: "#faebeb",
                    zeroLineColor: "transparent"
                }

            }],
            xAxes: [{
                gridLines: {
                    zeroLineColor: "transparent",
                    display: false,

                },
                ticks: {
                    padding: 10,
                    fontColor: "#663333",
                    fontStyle: "bold"
                }
            }]
        }
    };
    this.lineBigDashboardChartType = 'line';
              }, 300);
   }
}
