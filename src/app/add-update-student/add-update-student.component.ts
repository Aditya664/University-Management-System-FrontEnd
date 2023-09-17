import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropDown, Student } from '../Models/CommonModule';
import { StudentService } from '../Services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-update-student',
  templateUrl: './add-update-student.component.html',
  styleUrls: ['./add-update-student.component.css']
})
export class AddUpdateStudentComponent implements OnInit{

  form!:FormGroup;
  private formSubmitAttempt!: boolean; 
  courseDropdown!:DropDown[];
  branchDropdown!:DropDown[];
  studentPayload!:Student;

  constructor(private fb:FormBuilder,private studService:StudentService,  private snackBar: MatSnackBar ,
    private router:Router   ){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name:[null],
      rollNo:[null],
      address:[null],
      email:[null],
      classXII:[null],
      course:[null],
      fatherName:[null],
      dob:[null],
      phone:[null],
      classXI:[null],
      adhar:[null],
      branch:[null]
    })
    this.getALlCourses();
    this.getAllBranches();
    this.form.get('rollNo')?.setValue(this.generateRollNo());
    this.form.get('rollNo')?.disable();
  }

  
  private preparePayload(){
    this.studentPayload = new Student();
    this.studentPayload.name = this.form.get('name')?.value,
    this.studentPayload.rollNo = this.form.get('rollNo')?.value,
    this.studentPayload.address = this.form.get('address')?.value,
    this.studentPayload.email = this.form.get('email')?.value,
    this.studentPayload.classXIIPer = this.form.get('classXII')?.value,
    this.studentPayload.courseName = this.form.get('course')?.value,
    this.studentPayload.fatherName = this.form.get('fatherName')?.value,
    this.studentPayload.dob = this.form.get('dob')?.value,
    this.studentPayload.phoneNo = this.form.get('phone')?.value,
    this.studentPayload.classXPer = this.form.get('classXI')?.value
    this.studentPayload.adharNo = this.form.get('adhar')?.value
    this.studentPayload.branchName = this.form.get('branch')?.value
  }

  private getALlCourses(){
    this.studService.getAllCourses().subscribe({
      next:(res)=>{
        this.courseDropdown = res;
      }
    })
  }

  onSaveStudent(){
    if(this.form.valid){
      this.preparePayload();
      this.studService.addNewStudent(this.studentPayload).subscribe({
        next:(res)=>{
          this.snackBar.open("Student added successfully","Success");
          this.router.navigate(['/student-list'])
        }
      });
    }else{
      this.form.markAllAsTouched();
    }
  }

  private getAllBranches(){
    this.studService.getAllBranches().subscribe({
      next:(res)=>{
        this.branchDropdown = res;
      }
    })
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  private  generateRollNo():number{
    const min = 10000;
    const max = 99999;
    const rollNo = Math.floor(Math.random() * (max - min + 1)) + min;
    return rollNo;
    }
}
