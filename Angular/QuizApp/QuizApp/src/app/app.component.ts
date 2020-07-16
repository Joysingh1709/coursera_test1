import { Component } from '@angular/core';
import { QuizService } from './services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public quizService: QuizService,
    private router: Router){
  }
  
  title = 'QuizApp';

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.quizService.userLog = false;
      this.quizService.user = JSON.parse(localStorage.getItem('user'));
      this.quizService.username = this.quizService.user.name;
    }
    else{
      this.quizService.userLog = true;
    }
  }

  signOut(){
    localStorage.clear();
        console.log("user has been deleted and signed out");
        
        clearInterval(this.quizService.timer);
    
    this.router.navigate(['/register']);
  }
}
