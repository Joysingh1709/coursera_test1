import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  button: boolean;

  constructor(public quizService: QuizService, 
    private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') != null){
      this.button = true;       
    }
    else{
      this.button = false;
    }
  }

  toggle(){
    this.quizService.opened = !this.quizService.opened;
    console.log(this.quizService.opened);
  }

  signOut(){
    localStorage.clear();
        console.log("user has been deleted and signed out");
        
        clearInterval(this.quizService.timer);
    
    this.router.navigate(['/register']);
  };
}