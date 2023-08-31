// class subjectList{
//   _id?:string;
// }

class feeStructure{
  year?:number;
  registration_fee?:number;
  coaching_fee:number;
  exam_fee:number;
  convocation_fee: number;
  attestation_fee: number;
  equalency_fee: number;
  other_fee:number;
  total_fee:number;
  subjectList?:any[];

}
export class Fee {
  _id?: string;
  courseId?:any;
  feeStructure?:feeStructure[];
  totalAmount?:number;
}

