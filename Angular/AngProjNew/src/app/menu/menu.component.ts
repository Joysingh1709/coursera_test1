import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';

const DISHES: Dish[] = [
  {
    id : '0',
    name : 'buffet',
    image : '/assets/images/buffet.png',
    category : 'mains',
    featured : true,
    label : 'hot',
    price : 5.9,
    description : 'A type of a pasta with a suth indian touch',
  },
  {
    id : '1',
    name : 'elaicheesecake',
    image : '/assets/images/elaicheesecake.png',
    category : 'mains',
    featured : true,
    label : 'hot',
    price : 6.8,
    description : 'A type of a pasta with a suth indian touch',
  },
  {
    id : '2',
    name : 'uthappizza',
    image : '/assets/images/uthappizza.png',
    category : 'mains',
    featured : true,
    label : 'hot',
    price : 4.6,
    description : 'A type of a pasta with a suth indian touch',
  }
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit 
{
  dishes = DISHES;

  constructor() { }

  ngOnInit(): void {
  }

}
