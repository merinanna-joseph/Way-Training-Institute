import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Test } from '../shared/models/testimage.model';
@Component({
  selector: 'app-test-image',
  templateUrl: './test-image.component.html',
  styleUrls: ['./test-image.component.css']
})
export class TestImageComponent implements OnInit {
  imagePreview: string | ArrayBuffer;
  imageofprofilePhoto: any;
  // addTestForm: FormGroup;
  test:Test = {};
  addTestForm: FormGroup = this.formBuilder.group({
    title:[''],
     imagePath: [''],

  });
  // all: import("src/app/shared/models/student.model").Student[];


  constructor(private formBuilder: FormBuilder, public studentService: StudentService,) { }


  ngOnInit(): void {
    this.addTestForm = this.formBuilder.group({
      title:[''],
       imagePath: [''],

    });

// this.getAllImages()
  }
  getAllImages(){
    // alert("hi")
    this.studentService.getTestImages().
    subscribe((res:any)=>{
      this.imageofprofilePhoto=res.imageUrl;
    })


    }

  onImagePicked(event:Event)
  {
    // const ff=event.target.files[0];
    const file=(event.target as HTMLInputElement).files[0];
    console.log(file)
    this.addTestForm.patchValue({imagePath:file});
    this.addTestForm.get('imagePath').updateValueAndValidity();
    const reader=new FileReader();
    reader.onload=()=>{
      this.imagePreview=reader.result
    };
    reader.readAsDataURL(file)
    }
    get s() {
      return this.addTestForm.controls;
    }

    onformSubmit(){
      this.test.title = this.s.title.value;
      this.test.imagePath =this.s.imagePath.value;
      // alert(this.test.title)
      console.log(this.test + "admission before saving");
      this.studentService.addTestImage(this.test).subscribe(
        (data)=>{
          console.log(data+ "admission after saving");
          // alert("success")
      })


    }


}
