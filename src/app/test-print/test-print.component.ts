import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-print',
  templateUrl: './test-print.component.html',
  styleUrls: ['./test-print.component.css']
})
export class TestPrintComponent implements OnInit {
  minYear = 4;
  NIOS10_subjectlist = [
    {
      value: '202 - English',
      label: '202 - English',
      isChecked: true
    },
    {
      value: '209 - Sanskrit',
      label: '209 - Sanskrit',
      isChecked: false

    },
    {
      value: '211 - Mathematics',
      label: '211 - Mathematics',
      isChecked: false

    },
    {
      value: '212 - Science and Technology',
      label: '212 - Science and Technology',
      isChecked: false

    },
    {
      value: '213 - Social science',
      label: '213 - Social science',
      isChecked: false

    },
    {
      value: '214 - Economics',
      label: '214 - Economics',
      isChecked: false

    },
    {
      value: '215 - Business Studies',
      label: '215 - Business Studies',
      isChecked: false

    },
    {
      value: '216 - Home Science',
      label: '216 - Home Science',
      isChecked: false

    },
    {
      value: '222 - Psychology',
      label: '222 - Psychology',
      isChecked: false

    },
    {
      value: '223 - Indian Culture and Heritage',
      label: '223 - Indian Culture and Heritage',
      isChecked: false

    },
    {
      value: '224 - Accountancy',
      label: '224 - Accountancy',
      isChecked: false

    },
    {
      value: '225 - Painting',
      label: '225 - Painting',
      isChecked: false

    },
    {
      value: '229 - Data Entry Operations',
      label: '229 - Data Entry Operations',
      isChecked: false

    },
    {
      value: '235 - Arabic',
      label: '235 - Arabic',
      isChecked: false

    },
  ];

  NIOS12_subjectlist = [
    {
      value: '302 - English',
      label: '302 - English'
    },
    {
      value: '303 - Bengali',
      label: '303 - Bengali'
    },
    {
      value: '306 - Urdu',
      label: '306 - Urdu'
    },
    {
      value: '309 - Sanskrit',
      label: '309 - Sanskrit'
    },
    {
      value: '311 - Mathematics',
      label: '311 - Mathematics'
    },

    {
      value: '312 - Physics',
      label: '312 - Physics'
    },
    {
      value: '313 - Chemistry',
      label: '313 - Chemistry'
    },
    {
      value: '314 - Biology',
      label: '314 - Biology'
    },
    {
      value: '315 - History',
      label: '315 - History'
    },
    {
      value: '316 - Geography',
      label: '316 - Geography'
    },
    {
      value: '317 - Political Science',
      label: '317 - Political Science'
    },
    {
      value: '318 - Economics',
      label: '318 - Economics'
    },

    {
      value: '319 - Business Studies',
      label: '319 - Business Studies'
    },
    {
      value: '320 - Accountancy',
      label: '320 - Accountancy'
    },
    {
      value: '321 - Home Science',
      label: '321 - Home Science'
    },
    {
      value: '328 - Psychology',
      label: '328 - Psychology'
    },
    {
      value: '330 - Computer Science',
      label: '330 - Computer Science'
    },
    {
      value: '331 - Sociology',
      label: '331 - Sociology'
    },
    {
      value: '332 - Painting',
      label: '332 - Painting'
    },
    {
      value: '333 - Enviornmental Science',
      label: '333 - Enviornmental Science'
    },
    {
      value: '335 - Mass Communications',
      label: '335 - Mass Communications'
    },
    {
      value: '336 - Data Entry Operations',
      label: '336 - Data Entry Operations'
    },
    {
      value: '338 - Introduction to Law',
      label: '338 - Introduction to Law'
    },
    {
      value: '339 - Library & Information Science',
      label: '339 - Library & Information Science'
    },

  ];
  constructor() { }

  ngOnInit(): void {
  }
  getPrint(){
    this.print();
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    // popupWin.document.write(`
    //   <html>
    //     <head>
    //       <title>Invoice</title>
    //       <style>
    //       .colored-image {
    //         background-image: linear-gradient(to right, #e6e9ddd2, #e6e9ddd2),
    //         /* url("http://localhost:3000/assets/img/profile.png"); */
    //         url("http://206.189.140.241:4200/assets/img/profile.png");
    // url("https://admintimes.com/assets/img/profile.png");
    //         background-blend-mode: overlay;
    //         background-size: contain;
    //         width: 200px;
    //         height: 200px;
          
    //       }
          
    //       .image-preview
    //       {
    //         height:200px;
    //       }
    //       .collage {
    //         cursor:pointer;
    //         width:35mm;
    //         height:35mm;
    //         background: #fcf9f9;
    //         float: right;
    //         border: 1px solid #ccc;
          
    //       }
    //       input[type="file"]{
    //         visibility: hidden;
    //         }
    //         .custom-file-upload {
    //           border: 1px solid #ccc;
    //           display: inline-block;
    //           padding: 6px 12px;
    //           cursor: pointer;
    //           /* border: 3px dotted #bebebe; */
    //           border-radius: 10px;
    //           width: 200px;
    //           text-align: center;
    //       }
    //       #remarkstyle{
    //         border: 1px solid #ced4da !important;
    //         border-radius: 10px;
          
    //       }
          
    //       </style>
    //     </head>
    // <body onload="window.print();window.close()">${printContents}</body>
    //   </html>`);
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" media="print"/><style> .collage {cursor:pointer;width:35mm;height:35mm;background: #fcf9f9;float: right;border: 1px solid #ccc;}  .image-preview{height:200px;}</style></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();
  }
}
