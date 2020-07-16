import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  step = 0;

  panelOpenState = false;

  constructor(public quizService: QuizService, 
    private router: Router) { }

  setStep(index: number) {
    this.step = index;
    console.log(this.step);
  }

  nextStep() {
    this.step++;
    console.log(this.step);
  }

  prevStep() {
    this.step--;
    console.log(this.step);
  }

  onSubmit(){
       this.quizService.submitScore();
          // .subscribe((data) => {
          //     console.log("user data has been updated as given below");
          //     console.log(data);                      
          //  });
  }

  restart(){
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('questions', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/quiz']);
  }

  ngOnInit(): void {
    this.quizService.userLog = false;
    if(parseInt(localStorage.getItem('qnProgress')) == 10) {
       this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
       this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
       this.quizService.questions = JSON.parse(localStorage.getItem('questions'));
       
    this.quizService.user = JSON.parse(localStorage.getItem('user'));
    this.quizService.username = this.quizService.user.name;

    this.quizService.getAnswers().subscribe(
      (data:any) => {
        this.quizService.correctAnsCount = 0;
        console.log(this.quizService.questions);
        console.log(data);
        this.quizService.questions.forEach((e,i) => {
          if(e.answer == data[i])
            this.quizService.correctAnsCount++;
            e.correct = data[i];          
        }); 
      }
    );
  }
  else{
    this.router.navigate(['/quiz']);
  }
  }

}
