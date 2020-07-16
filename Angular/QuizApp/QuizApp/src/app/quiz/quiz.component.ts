import { Component, OnInit, Inject } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Question } from '../shared/Question';
import { baseURL } from '../shared/BaseUrl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  imgUri = "../";

  constructor(public quizService : QuizService,
    @Inject('BaseURL') public BaseURL,
    private router: Router) { }

  ngOnInit(): void {
    this.quizService.userLog = false;
    this.quizService.user = JSON.parse(localStorage.getItem('user'));
    this.quizService.username = this.quizService.user.name;
    
    if(parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.questions = JSON.parse(localStorage.getItem('questions'));
      
      if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);
      else
        this.startTimer();
    }
    else{
    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;
    this.quizService.getQuestions().subscribe(
      (data) => {
        this.quizService.questions = data;
        this.startTimer();
      }
    );
    }
  }

  startTimer(){
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  selectAnswer(qId, choice){
    this.quizService.questions[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('questions', JSON.stringify(this.quizService.questions));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if ( this.quizService.qnProgress == 10) {
      console.log(this.quizService.questions)
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

}
