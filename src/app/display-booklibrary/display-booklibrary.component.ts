import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { BookLibraryService } from '../services/booklibrary.service';

@Component({
  selector: 'app-display-booklibrary',
  templateUrl: './display-booklibrary.component.html',
  styleUrls: ['./display-booklibrary.component.css']
})
export class DisplayBooklibraryComponent implements OnInit {
  allBookLibrary = [];

  constructor(
    public auth:AuthService,
    private aroute: ActivatedRoute,
    public toast: ToastComponent,
     public route: Router,
     public booklibraryService:BookLibraryService
  ) { }

  ngOnInit(): void {
    this.booklibraryService.getAllBooklibraryWithALLDetails().subscribe(
      data=>{
        console.log(data,"hhh");
        this.allBookLibrary = data;
        this.allBookLibrary.reverse();
      }
    );

  }
createbookLibrary(){
  if(this.auth.isAdmin){
    this.route.navigate(['create-booklibrary/']);
  }else if(this.auth.isTeacher){
    this.route.navigate(['teacher-create-booklibrary/']);
  }
}
onBookClick(book){
  console.log(book,"ggg");
  if(this.auth.isAdmin){

    this.route.navigate(['addsubandmaterial/'+ book._id]);
  }else if(this.auth.isTeacher){
    this.route.navigate(['teacher-addsubandmaterial/'+ book._id]);
  }
}
}
