import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Promotion } from '../shared/promotion';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[]{
    return DISHES;
  }

  getDish(id: String): Dish{
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFreaturedDish(): Dish{
    return DISHES.filter((dish) => (dish.featured))[0];
  }
}
