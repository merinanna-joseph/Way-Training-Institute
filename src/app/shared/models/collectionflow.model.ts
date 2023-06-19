class month_list{
  month?: string;
  isRequired?:Boolean;
  isPaid?:Boolean;
  paid_fee?:number;
  
 
}
export class Collectionflow {
    _id?: string;
    // paidOn?: string;
    // totAmount?: string;
    year?: String;
    collectedOn?: Date;

    isCertificateCollected?: Boolean;
    isBookCollected?: Boolean;
    isTransportationNeeded?: Boolean;
    month_list?:month_list[];

    collectionType?:string;
    remarks?:string;
    studentId?:any;
    
    
    
  }
  