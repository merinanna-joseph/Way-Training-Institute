import { Injectable } from '@angular/core';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

// @Injectable()

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
  public close(){
    const modalRef = this.modalService.open(ConfirmationDialogComponent);
    modalRef.dismiss();

  }
}
