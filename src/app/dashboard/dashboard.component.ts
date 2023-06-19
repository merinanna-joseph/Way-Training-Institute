import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead.service';
import { Lead } from '../shared/models/lead.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CalleventService } from '../services/callevent.service';
import { Callevent } from '../shared/models/callevent.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  callEvents:Callevent[] = [];
  lead : Lead = {};
  leadDetails1;

  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas : any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData:Array<any>;
  public lineBigDashboardChartOptions:any;
  public lineBigDashboardChartLabels:Array<any>;
  public lineBigDashboardChartColors:Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData:Array<any>;
  public lineChartOptions:any;
  public lineChartLabels:Array<any>;
  public lineChartColors:Array<any>

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData:Array<any>;
  public lineChartWithNumbersAndGridOptions:any;
  public lineChartWithNumbersAndGridLabels:Array<any>;
  public lineChartWithNumbersAndGridColors:Array<any>

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData:Array<any>;
  public lineChartGradientsNumbersOptions:any;
  public lineChartGradientsNumbersLabels:Array<any>;
  public lineChartGradientsNumbersColors:Array<any>
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
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

  constructor(
    private leadService : LeadService,
    public route:Router,
    private callEventService : CalleventService,
    public auth:AuthService,) { }

    lineBigDashboardChartLabelsData : Array<number> = [0,0,0,0,0,0,0,0,0,0,0,0];
    cancelledChartLabelsData : Array<number> = [0,0,0,0,0,0,0,0,0,0,0,0];
    convertedChartLabelsData : Array<number> = [0,0,0,0,0,0,0,0,0,0,0,0];
    inprogressChartLabelsData : Array<number> = [0,0,0,0,0,0,0];
    
    groupByMonth(objectArray:Lead[],isClosed:boolean) {
      let labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      return objectArray.reduce(function (acc, obj:Lead) {
        let key = "";
        if(isClosed){
          key = labels[new Date(""+obj.closedOn).getMonth()]  + "-"+new Date(""+obj.closedOn).getFullYear();
        }else{
          key = labels[new Date(""+obj.createdOn).getMonth()]  + "-"+new Date(""+obj.createdOn).getFullYear();
        }
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key]++;
        return acc
      }, {})
    }

    groupByDay(objectArray:Lead[]) {
      let labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      return objectArray.reduce(function (acc, obj:Lead) {
        let key = "";
        key = labels[new Date(""+obj.createdOn).getMonth()]  + "-"+new Date(""+obj.createdOn).getDate();
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key]++;
        return acc
      }, {})
    }
  
    lineBigDashboardChartLabels1 = ["","","","","","","","","","","",""];
    chartWeekLabels = ["","","","","","","","","","","",""];
    getMonthArray(){
      var currentDate = new Date();
      for(let i=11;i>=0;i--){
        this.lineBigDashboardChartLabels1[i] = this.lineBigDashboardChartLabels[currentDate.getMonth()] + "-"+currentDate.getFullYear();
        currentDate.setMonth(currentDate.getMonth() - 1);
      }
    }
    getWeekArray(){
      var currentDate = new Date();
      for(let i=6;i>=0;i--){
        this.chartWeekLabels[i] = this.lineBigDashboardChartLabels[currentDate.getMonth()] + "-"+currentDate.getDate();
        currentDate.setDate(currentDate.getDate() - 1);
      }
    }

    getStatusWiseLeads(groupedLeads:any[]){
      return groupedLeads.reduce(function (acc, obj:Lead) {
        let key = obj.status;
        if(!acc[key]){
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc
      }, {})
    }

  ngOnInit() {
    this.callEventService.getAllCalleventsByLead().subscribe(
      callEvents => {
        callEvents.reverse();
        callEvents.sort((a, b) => {
          return <any>new Date(b.date) - <any>new Date(a.date);
        });
        for(var i = 0;i<callEvents.length;i++)
        {
          if(this.callEvents.length < 10)
          {
             this.callEvents.push(callEvents[i]);
          }
        }
      },
      error => {

      }
    );
    this.leadDetails1 = [];

    this.leadService.getLeads().subscribe(
      data =>{
          if(data.length > 0){
            data.reverse();
            for(var i in data){
              if(this.leadDetails1.length < 10){
                this.leadDetails1.push(data[i])
              }
            }
          }
          else{
            this.leadDetails1 = data; 
          }
      }
    );
    
    this.leadDetails1 = [];

    this.chartColor = "#FFFFFF";
    this.lineBigDashboardChartLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    this.leadService.getLeads().subscribe(
      leads =>{
        if(leads.length > 0){
          leads.reverse();
          for(var j in leads){
            if(this.leadDetails1.length < 10){
              this.leadDetails1.push(leads[j])
            }
          }
        }
        else{
          this.leadDetails1 = leads; 
        }
        
        let groupedLeads:any = this.groupByMonth(leads,false);
        let statusWiseLeads = this.getStatusWiseLeads(leads);
        this.getMonthArray();
        this.getWeekArray();
        let closedMonthWiseLeadCount = {};
        let convertedMonthwiseLeadCount = {};
        let iprogressDaywiseLeadCount = {};
        if(statusWiseLeads['CANCELLED']){
          closedMonthWiseLeadCount = this.groupByMonth(statusWiseLeads['CANCELLED'],true);
        }
        if(statusWiseLeads['CONVERTED']){
          convertedMonthwiseLeadCount = this.groupByMonth(statusWiseLeads['CONVERTED'],true);
        }
        if(statusWiseLeads['INPROGRESS']){
          iprogressDaywiseLeadCount = this.groupByDay(statusWiseLeads['INPROGRESS']);
        }
        
        let i=0;
        this.lineBigDashboardChartLabels1.forEach(label => {
          if(groupedLeads[label]){
            this.lineBigDashboardChartLabelsData[i] = parseInt(""+groupedLeads[label]);
          }
          if(closedMonthWiseLeadCount[label]){
            this.cancelledChartLabelsData[i] = parseInt(""+closedMonthWiseLeadCount[label]);
          }
          if(convertedMonthwiseLeadCount[label]){
            this.convertedChartLabelsData[i] = parseInt(""+convertedMonthwiseLeadCount[label]);
          }
          i++;
        });
        i=0;
        this.chartWeekLabels.forEach(label => {
          if(iprogressDaywiseLeadCount[label]){
            this.inprogressChartLabelsData[i] = parseInt(""+iprogressDaywiseLeadCount[label]);
          }
          i++;
        })
        this.chartColor = "#FFFFFF";
        this.canvas = document.getElementById("bigDashboardChart");
        this.ctx = this.canvas.getContext("2d");

        this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
        this.gradientStroke.addColorStop(0, '#80b6f4');
        this.gradientStroke.addColorStop(1, this.chartColor);

        this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
        this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
        this.lineBigDashboardChartData = [
          {
            label: "Leads",
  
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
              backgroundColor: '#fff',
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
                        fontColor: "rgba(255,255,255,0.4)",
                        fontStyle: "bold",
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        padding: 10
                    },
                    gridLines: {
                        drawTicks: true,
                        drawBorder: false,
                        display: true,
                        color: "rgba(255,255,255,0.1)",
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
                        fontColor: "rgba(255,255,255,0.4)",
                        fontStyle: "bold"
                    }
                }]
            }
        };
        this.lineBigDashboardChartType = 'line';

        this.gradientChartOptionsConfiguration = {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            bodySpacing: 4,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            xPadding: 10,
            yPadding: 10,
            caretPadding: 10
          },
          responsive: 1,
          scales: {
            yAxes: [{
              display: 0,
              ticks: {
                display: false
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false
              }
            }],
            xAxes: [{
              display: 0,
              ticks: {
                display: false
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false
              }
            }]
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 15,
              bottom: 15
            }
          }
        };
    
        this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            bodySpacing: 4,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            xPadding: 10,
            yPadding: 10,
            caretPadding: 10
          },
          responsive: true,
          scales: {
            yAxes: [{
              gridLines: {
                zeroLineColor: "transparent",
                drawBorder: false
              },
              ticks: {
                  stepSize: 500
              }
            }],
            xAxes: [{
              display: 0,
              ticks: {
                display: false
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false
              }
            }]
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 15,
              bottom: 15
            }
          }
        };
    
        this.canvas = document.getElementById("lineChartExample");
        this.ctx = this.canvas.getContext("2d");
    
        this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
        this.gradientStroke.addColorStop(0, '#80b6f4');
        this.gradientStroke.addColorStop(1, this.chartColor);
    
        this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
        this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
    
        this.lineChartData = [
            {
              label: "Leads",
              pointBorderWidth: 2,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 1,
              pointRadius: 4,
              fill: true,
              borderWidth: 2,
              data: this.cancelledChartLabelsData
            }
          ];
          this.lineChartColors = [
           {
             borderColor: "#f96332",
             pointBorderColor: "#FFF",
             pointBackgroundColor: "#f96332",
             backgroundColor: this.gradientFill
           }
         ];
        this.lineChartOptions = this.gradientChartOptionsConfiguration;
        this.lineChartType = 'line';
    
        this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
        this.ctx = this.canvas.getContext("2d");
    
        this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
        this.gradientStroke.addColorStop(0, '#18ce0f');
        this.gradientStroke.addColorStop(1, this.chartColor);
    
        this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
        this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));
    
        this.lineChartWithNumbersAndGridData = [
            {
              label: "Leads",
               pointBorderWidth: 2,
               pointHoverRadius: 4,
               pointHoverBorderWidth: 1,
               pointRadius: 4,
               fill: true,
               borderWidth: 2,
              data: this.convertedChartLabelsData
            }
          ];
          this.lineChartWithNumbersAndGridColors = [
           {
             borderColor: "#18ce0f",
             pointBorderColor: "#FFF",
             pointBackgroundColor: "#18ce0f",
             backgroundColor: this.gradientFill
           }
         ];
        this.lineChartWithNumbersAndGridLabels = ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"];
        this.lineChartWithNumbersAndGridOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;
    
        this.lineChartWithNumbersAndGridType = 'line';  





    this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.lineChartGradientsNumbersData = [
        {
          label: "Leads",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: this.inprogressChartLabelsData
        }
      ];
    this.lineChartGradientsNumbersColors = [
     {
      backgroundColor: this.gradientFill,
      borderColor: "#2CA8FF",
      pointBorderColor: "#FFF",
      pointBackgroundColor: "#2CA8FF"
     }
   ];
    this.lineChartGradientsNumbersOptions = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        responsive: 1,
        scales: {
          yAxes: [{
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false
            },
            ticks: {
                stepSize: 10
            }
          }],
          xAxes: [{
            display: 0,
            ticks: {
              display: false
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false
            }
          }]
        },
        layout: {
          padding: {
            left: 15,
            right: 15,
            top: 15,
            bottom: 15
          }
        }
      }

    this.lineChartGradientsNumbersType = 'bar';

      }
    );
    
    

    this.chartColor = "#FFFFFF";
    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
              stepSize: 500
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.canvas = document.getElementById("lineChartExample");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    this.lineChartData = [
        {
          label: "Active Users",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 2,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
        }
      ];
      this.lineChartColors = [
       {
         borderColor: "#f96332",
         pointBorderColor: "#FFF",
         pointBackgroundColor: "#f96332",
         backgroundColor: this.gradientFill
       }
     ];
    this.lineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.lineChartOptions = this.gradientChartOptionsConfiguration;

    this.lineChartType = 'line';

    this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#18ce0f');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

    this.lineChartWithNumbersAndGridData = [
        {
          label: "Email Stats",
           pointBorderWidth: 2,
           pointHoverRadius: 4,
           pointHoverBorderWidth: 1,
           pointRadius: 4,
           fill: true,
           borderWidth: 2,
          data: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
        }
      ];
      this.lineChartWithNumbersAndGridColors = [
       {
         borderColor: "#18ce0f",
         pointBorderColor: "#FFF",
         pointBackgroundColor: "#18ce0f",
         backgroundColor: this.gradientFill
       }
     ];
    this.lineChartWithNumbersAndGridLabels = ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"];
    this.lineChartWithNumbersAndGridOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.lineChartWithNumbersAndGridType = 'line';




    this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.lineChartGradientsNumbersData = [
        {
          label: "Active Countries",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
        }
      ];
    this.lineChartGradientsNumbersColors = [
     {
       backgroundColor: this.gradientFill,
       borderColor: "#2CA8FF",
       pointBorderColor: "#FFF",
       pointBackgroundColor: "#2CA8FF",
     }
   ];
    this.lineChartGradientsNumbersLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.lineChartGradientsNumbersOptions = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        responsive: 1,
        scales: {
          yAxes: [{
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false
            },
            ticks: {
                stepSize: 20
            }
          }],
          xAxes: [{
            display: 0,
            ticks: {
              display: false
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false
            }
          }]
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 15,
            bottom: 15
          }
        }
      }

    this.lineChartGradientsNumbersType = 'line';
  }

  onViewClick(callEvent:Callevent){
    this.route.navigate(['admin-single-lead/'+callEvent.leadId._id])
  }
  onLeadViewClick(lead:Lead){
    this.route.navigate(['admin-single-lead/'+lead._id])
  }
}
