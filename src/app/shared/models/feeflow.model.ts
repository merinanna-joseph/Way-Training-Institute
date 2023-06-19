

// class feeStructure{
//   year?:any;
//   month?:string;
//   registration_fee?:number;
//   coaching_fee?:number;
//   exam_fee?:number;
//   convocation_fee?: number;
//   attestation_fee?: number;
//   equalency_fee?: number;
//   other_fee?: number;

//   registration_fee_arrears?:number;
//   coaching_fee_arrears?:number;
//   exam_fee_arrears?:number;
//   convocation_fee_arrears?: number;
//   attestation_fee_arrears?: number;
//   equalency_fee_arrears?: number;
//   other_fee_arrears?: number;

//   registration_fee_paid_date?:number;
//   coaching_fee_paid_date?:number;
//   exam_fee_paid_date?:number;
//   convocation_fee_paid_date?: number;
//   attestation_fee_paid_date?: number;
//   equalency_fee_paid_date?: number;
//   other_fee_paid_date?: number;

//   registration_fee_arrears_balance ?:number;
//   coaching_fee_arrears_balance  ?:number;
//   exam_fee_arrears_balance ?:number;
//   convocation_fee_arrears_balance?:number;
//   attestation_fee_arrears_balance?:number;
//   equalency_fee_arrears_balance?:number;
//   other_fee_arrears_balance?:number;
  

// }
  class fee_Per_Year{
    year?:any;
    total_fee?:number;
    balance_fee?:number;
    paid_fee?:number;
    
    registration_fee_total?:number;
    coaching_fee_total?:number;
    exam_fee_total?:number;
    convocation_fee_total?:number;
    attestation_fee_total?:number;
    equalency_fee_total?:number;
    other_fee_total?:number;

    registration_fee_balance ?:number;
    coaching_fee_balance  ?:number;
    exam_fee_balance ?:number;
    convocation_balance?:number;
    attestation_balance?:number;
    equalency_balance?:number;
    other_balance?:number;

    miscellaneous_fees_total?:number;
    miscellaneous_fees_paid_date?:number;

    transport_fees_total?:number;
    transport_fees_paid_date?:number;

    previous_year_arrear?: number;
    previous_year_arrear_balance?: number;
    previous_year_arrear_paid?: number;

    previous_year_arrear_paid_date?:number;
  }


  
export class Feeflow {
    _id?: string;
   
    // paidAmount?: string;
    paymentMode?: string;
    remarks?: string;
    lastPaidDate?: Date;
    
    studentId?: any;
    // feeStructure?:feeStructure[];
    fee_per_year?:fee_Per_Year[];
    ispaid?:boolean;

  }
  