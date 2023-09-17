import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../Services/student.service';
import { MatTable } from '@angular/material/table';
import { DatePipe } from '@angular/common';

export class Student {
  id!: number;
  name!: string;
  rollNo!: number;
  address!: string;
  email!: string;
  classXIIPer!: number;
  courseName!: string;
  fatherName!: string;
  dob!: Date;
  phoneNo!: string;
  classXPer!: number;
  adharNo!: number;
  branchName!: string;
}


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  displayedColumns: any[] = [];
  dataSource: Student[] = []; // Use the actual type of your data

  customColumnNames: { [key: string]: string } = {
    id: "ID",
    name: "Name",
    rollNo: "Roll Number",
    address: "Address",
    email: "Email",
    classXIIPer: "Class XII Percentage",
    courseName: "Course Name",
    fatherName: "Father's Name",
    dob: "Date of Birth",
    phoneNo: "Phone Number",
    classXPer: "Class X Percentage",
    adharNo: "Adhar Number",
    branchName: "Branch Name"
  };

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private studService: StudentService) {}

  ngOnInit(): void {
    this.displayedColumns = Object.keys(this.customColumnNames);

    this.studService.getAllStudents().subscribe({
      next: (res:Student[]) => {
        this.dataSource = res;
        this.table.renderRows();
      }
    });
  }
}
