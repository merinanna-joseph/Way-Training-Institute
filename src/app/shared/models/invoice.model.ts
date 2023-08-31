
export class Invoice {
    _id?: string;
   
    // year?: String;
    paymentMode?: String;
    remittedDate?: Date;

    // registration_fee?:number;
    // coaching_fee?:number;
    // exam_fee?:number;
    // convocation_fee?: number;
    // attestation_fee?: number;
    // equalency_fee?: number;
    // other_fee?: number;

    miscellaneous_fee?: number;
    transport_fee?: number;
    previousyear_arrear?:number;
    total_course_fee?: number;
    total_remitted_fee?: number;
    
    total_fee?:number;
    balance_fee?:number;

    remarks?:string;
    studentId?:any;
    
    
    
  }
  