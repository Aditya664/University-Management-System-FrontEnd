import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUpdateStudentComponent } from './add-update-student/add-update-student.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'student-list', component: StudentListComponent },
  { path: 'add-student', component: AddUpdateStudentComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }

  // { path: 'student-list', component: StudentListComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent ,canActivate:[AuthGuard] },
  // { path: '', component:DashboardComponent,redirectTo:'/dashboard',pathMatch:'full'}, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
