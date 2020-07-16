import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'quiz', component: QuizComponent, canActivate : [AuthGuard]
    },
    {
        path: 'result', component: ResultComponent, canActivate : [AuthGuard]
    },
    {
        path: '', redirectTo: '/register', pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static RouterModule: any;
}
