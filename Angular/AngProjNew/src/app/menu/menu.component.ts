import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import{ flyInOut, expand } from '../appAnimations/app.animations';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class MenuComponent implements OnInit 
{
  dishes: Dish[];
  errMsg: string;

  selectedDish : Dish;

  constructor(private dishService : DishService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes()
        .subscribe((dishes) => this.dishes = dishes, 
        errmsg => this.errMsg = <any>errmsg);
  }
}
