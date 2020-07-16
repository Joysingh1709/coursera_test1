import { Injectable } from '@angular/core';
import { Register } from '../shared/register';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/BaseUrl';
import { Question } from '../shared/Question';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  user: any;
  username: any;
  opened = false;
  userLog: boolean;
  questions: Question[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnsCount: number;

  constructor(private http: HttpClient) { }

  displayTimeElapsed(){
    return Math.floor(this.seconds/3600) + ':' + Math.floor(this.seconds/60) + ':' + Math.floor(this.seconds % 60);
  }

  putUser(data: Register){
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(data));
    data = JSON.parse(localStorage.getItem('user'));
    return data;
  }

  getQuestions(){
    return this.http.get<Question[]>(baseURL + 'questions');
  }

  getAnswers(){
    return this.getQuestions().pipe(map((data) => data.map((ans) => ans.answer)))
  }

  submitScore(){
    // var body = JSON.parse(localStorage.getItem('user'));
    // const userId = body.id;
    // body.score = this.correctAnsCount;
    // body.timeSpent = this.displayTimeElapsed();
    // return this.http.put(baseURL + 'users/' + userId , body);
    return;
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

}