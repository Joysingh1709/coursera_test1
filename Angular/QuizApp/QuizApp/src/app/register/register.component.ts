import { Component, OnInit } from '@angular/core';
import { Register } from '../shared/register';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registeredUser: Register;
  register: Register;
  registerForm : FormGroup;

  formErrors = {
    'name': '',
    'email': ''
  };

  validationMessages = {
    'name' : {
      'required': 'First name is required',
      'minlength': 'First name should be of at least 2 characters',
      'maxlength': 'First name should not exceed 25 characters'
    },
    'email': {
      'required': 'email is required',
      'email': 'email should be entered in correct format'
    }
  };

  constructor(private quizService: QuizService,
    private fb: FormBuilder,
    private route : Router) {

    this.registerForm = this.fb.group({
      'name' : new FormControl(
        '', [Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2)]
      ),
      'email' : new FormControl(
        '', [
          Validators.required,
          Validators.email,
          Validators.minLength(2)
        ]
      )
    });

    this.registerForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();

   }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.quizService.userLog = false;
      
      this.quizService.user = JSON.parse(localStorage.getItem('user'));
    this.quizService.username = this.quizService.user.name;

      if(parseInt(localStorage.getItem('qnProgress')) == 10){
        this.route.navigate(['/result']);
      }
      else{
        this.route.navigate(['/quiz'])
      }
    }
    this.quizService.userLog = true;
    this.quizService.username = null;
  }

  onValueChange(data?: any){
    if(!this.registerForm){ return;}
    const form = this.registerForm;

    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = ' ';

        const control = form.get(field);
        
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages [key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.register = this.registerForm.value;

    const id = this.quizService.makeid(5);
    this.register.id = id;

    this.register = this.quizService.putUser(this.register);
    console.log(this.register);   

    this.route.navigate(['/quiz']);
  }
}