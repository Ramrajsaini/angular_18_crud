import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeModel } from './model/Employee';
import { isPlatformBrowser } from '@angular/common';
import { json } from 'stream/consumers';
import { parse } from 'path';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  employeeform: FormGroup = new FormGroup({});

  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createFrom();

    if (typeof window !== 'undefined') {
      const oldData = localStorage.getItem('EmpData');
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.employeeList = parseData;
      }
    }
  }
  reset() {
    this.employeeObj = new EmployeeModel();
    this.createFrom();
  }
  createFrom() {
    this.employeeform = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name, [Validators.required]),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailid: new FormControl(this.employeeObj.emailid),
      pincode: new FormControl(this.employeeObj.pincode, [
        Validators.required,
        Validators.minLength(6),
      ]),
      state: new FormControl(this.employeeObj.state),
    });
  }
  onSave() {
    if (typeof window !== 'undefined') {
      const oldData = localStorage.getItem('EmpData');
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.employeeform.controls['empId'].setValue(parseData.length + 1);
        this.employeeList.unshift(this.employeeform.value);
      } else {
        this.employeeList.unshift(this.employeeform.value);
      }
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }
    this.reset();
  }
  onEdit(item: EmployeeModel) {
    this.employeeObj = item;
    this.createFrom();
  }
  onUpdate() {
    const record = this.employeeList.find(
      (m) => m.empId == this.employeeform.controls['empId'].value
    );
    if (record != undefined) {
      record.address = this.employeeform.controls['address'].value;
      record.name = this.employeeform.controls['name'].value;
      record.contactNo = this.employeeform.controls['contactNo'].value;
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.reset();
  }
  OnDelete(empId: number) {
    const isDelete = confirm('Are you sure want to Delete');
    if (isDelete) {
      const index = this.employeeList.findIndex((m) => m.empId == empId);
      this.employeeList.splice(index, 1);
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }
  }
}
