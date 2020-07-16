import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { DISHES } from '../shared/dishes';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { switchMap, delay } from 'rxjs/operators';
import { formComment, comment } from '../shared/comment';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { visibility, flyInOut, expand } from '../appAnimations/app.animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ] 
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMsg: string;
  dishCopy: Dish;
  visibility = 'shown';

  comment: formComment;
  commentFrom: FormGroup;

  cmtFormPrev = {
    'author': '',
    'comment': '',
    'rating': undefined
  };

  cmtFormErrors = {
    'author': '',
    'comment': ''
  };

  cmtErrorMessages = {
    'author': {
      'required': 'Enter your name first',
      'minlength': 'Name should be of at least 2 characters',
      'maxlength': 'Name should not exceed 25 characters'
    },
    'comment': {
      'minlength': 'please enter at least 2 characters',
      'required': 'please enter something in comment box'
    }
  };

  @ViewChild('cForm') commentFormDirective; 

  constructor( private dishService: DishService, 
    private route: ActivatedRoute, 
    private location: Location,
    private fb: FormBuilder,
    private processHTTPMsgService: ProcessHTTPMsgService,
    @Inject('BaseURL') public BaseURL ) {
      this.commentFormCreate();
     }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) =>
          {
            this.visibility = 'hidden';
           return this.dishService.getDish(params['id']);
          }))
    .subscribe(dish => {
      this.dish = dish; 
      this.dishCopy = dish; 
      this.setPrevNext(dish.id);
      this.visibility = 'shown';
      },
      errmess => this.errMsg = <any>errmess);
  }

  commentFormCreate(){
    this.commentFrom = this.fb.group({
      'author': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      'comment': ['', [Validators.minLength(2), Validators.required]],
      'rating': ''
    });

    this.commentFrom.valueChanges
      .subscribe(data => this.onValueChanges(data));
  }

  onValueChanges(data?: any){
    if(!this.commentFrom){ return; }
    const form = this.commentFrom;

    for(const field in this.cmtFormErrors){
      if(this.cmtFormErrors.hasOwnProperty(field)){
        this.cmtFormErrors[field] = ' ';

        const control = form.get(field);

        if(control && control.dirty && !control.valid){
          const messages = this.cmtErrorMessages[field];

          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.cmtFormErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

  commentSubmit(){
    this.comment = this.commentFrom.value;
      this.comment.date = new Date().toISOString();
      this.dishCopy.comments.push(this.comment);

      this.dishService.putDish(this.dishCopy)
      .subscribe(dish => {
        this.dish = dish;
        this.dishCopy = dish;
      },
      errmess => {
        this.dish = null;
        this.dishCopy =null;
        this.errMsg = errmess;
        });
    
    this.commentFrom.reset({
      name: '',
      comment: '',
      rating: 1
    });
    this.commentFormDirective.resetForm();
  }

}
