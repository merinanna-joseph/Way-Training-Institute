import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() message = { body: '', type: '',show:false,navigateUrl:''};

  constructor(private router: Router){}
  setMessage(body:string, type:string, navigateTo:string="") {
    this.message.body = body;
    this.message.type = type;
    this.message.show = true;
    this.message.navigateUrl = navigateTo;
    //setTimeout(() => this.message.body = '', time);
  }
  hideToast(){
    this.message.show = false;
    if(this.message.navigateUrl.length>0){
      this.router.navigate([this.message.navigateUrl]);
    }
   
  }
  
}
