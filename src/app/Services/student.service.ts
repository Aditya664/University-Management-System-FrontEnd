import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropDown, Student } from '../Models/CommonModule';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseUrl = "https://localhost:7239"
  constructor(private http:HttpClient) { }

  getAllStudents():Observable<Student[]>{
    return this.http.get<Student[]>(this.baseUrl+"/api/Student/students")
  }

  getAllCourses():Observable<DropDown[]>{
    return this.http.get<DropDown[]>(this.baseUrl+"/api/Course")
  }

  getAllBranches():Observable<DropDown[]>{
    return this.http.get<DropDown[]>(this.baseUrl+"/api/Branch")
  }
  addNewStudent(studentPayload:Student):Observable<any>{
    return this.http.post<any>(this.baseUrl+"/api/Student",studentPayload)
  }
}
