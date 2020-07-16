import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Feedback , ContactType } from '../shared/feedback';
import { flyInOut, expand, visibility } from '../appAnimations/app.animations';
import { FeedbackService }from '../services/feedback.service';
import { pipe } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],

  animations: [
    expand(),
    visibility()
  ]
})
export class ContactComponent implements OnInit {

  feedback: Feedback;
  feedbackCopy: Feedback = {
    'firstname': '',
    'lastname': '',
    'telnum': null,
    'email': '',
    'agree': false,
    'contacttype': '',
    'message': '',
  };

  feedbackForm: FormGroup;
  contactType = ContactType;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  errMsg: string;

  validationMessages = {
    'firstname' : {
      'required': 'First name is required',
      'minlength': 'First name should be of at least 2 characters',
      'maxlength': 'First name should not exceed 25 characters'
    },
    'lastname' : {
      'required': 'Last name is required',
      'minlength': 'Last name should be of at least 2 characters',
      'maxlength': 'Last name should not exceed 25 characters'
    },
    'telnum': {
      'required': 'Telnum is required',
      'pattern': 'Tel. should contain only numbers'
    },
    'email': {
      'required': 'email is required',
      'email': 'email should be entered in correct format'
    }
  };

  formVisibility = true;
  spinnerVisibility = false;
  prevVisibility = false;

  @ViewChild('fform') feedbackFormDirective; 

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,      
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  onValueChange(data?: any){
    if(!this.feedbackForm){ return;}
    const form = this.feedbackForm;

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

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.formVisibility = false;
    this.spinnerVisibility = true;
    
    this.feedbackService.putFeedback(this.feedback).pipe(
      finalize(()=> {
        this.spinnerVisibility=false;
        setTimeout(()=>this.prevVisibility=true,1000);

        setTimeout(()=>{
          this.prevVisibility=false;
          this.feedbackForm.reset();
          this.formVisibility=true;
        },6000);

        
      })
    ).subscribe(feedback => {

      this.feedback = feedback;
      this.feedbackCopy = feedback;
    },
    errmess => {
      this.feedback = null;
      this.feedbackCopy = null;
      this.errMsg = errmess;
    });

    // this.feedbackForm.reset();

  }
}
