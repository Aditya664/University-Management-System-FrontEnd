import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../student-list/student-list.component';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseUrl = "https://localhost:7239"
  constructor(private http:HttpClient) { }

  getAllStudents():Observable<Student[]>{
    return this.http.get<Student[]>(this.baseUrl+"/api/Student/students")
  }
}
