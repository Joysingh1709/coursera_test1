import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../appAnimations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  FeaturedLeader: Leader;
  errMsg: string;

  constructor(private dishService: DishService, 
    private promotionService: PromotionService,
    private LeaderService: LeaderService,
    @Inject('BaseURL') public BaseURL ) { }

  ngOnInit(): void {
    this.dishService.getFreaturedDish().subscribe((dish) => this.dish = dish,
        errmess => this.errMsg = <any>errmess);
    this.promotionService.getFreaturedPromotion().subscribe((promotion) => this.promotion = promotion,
        errmess => this.errMsg = <any>errmess);
    this.LeaderService.getFeaturedLeader().subscribe((FeaturedLeader) => this.FeaturedLeader = FeaturedLeader,
        errmess => this.errMsg = <any>errmess);
  }
}
