export class EmployeeModel {
  empId: number;
  name: string;
  city: string;
  state: string;
  emailid: string;
  contactNo: string;
  address: string;
  pincode: string;

  constructor() {
    this.empId = 1;
    this.name = '';
    this.city = '';
    this.state = '';
    this.emailid = '';
    this.contactNo = '';
    this.address = '';
    this.pincode = '';
  }
}
