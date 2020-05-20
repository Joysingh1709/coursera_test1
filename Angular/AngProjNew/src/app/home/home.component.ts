import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  FeaturedLeader: Leader;

  constructor(private dishService: DishService, 
    private promotionService: PromotionService,
    private LeaderService: LeaderService ) { }

  ngOnInit(): void {
    this.dish = this.dishService.getFreaturedDish();
    this.promotion = this.promotionService.getFreaturedPromotion();
    this.FeaturedLeader = this.LeaderService.getFeaturedLeader();
  }

}
