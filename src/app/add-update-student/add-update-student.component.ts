import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-update-student',
  templateUrl: './add-update-student.component.html',
  styleUrls: ['./add-update-student.component.css']
})
export class AddUpdateStudentComponent implements OnInit{

  form!:FormGroup;
  private formSubmitAttempt!: boolean; 

  constructor(private fb:FormBuilder){

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
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }
}
