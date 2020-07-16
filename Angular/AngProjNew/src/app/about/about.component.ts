import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../appAnimations/app.animations';
 
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  constructor( private LeaderService: LeaderService,
    @Inject('BaseURL') public BaseURL ) { }

  Leaders: Leader[];
  errMsg: string;

  ngOnInit(): void {
    this.LeaderService.getLeaders().subscribe((Leaders) => this.Leaders = Leaders,
    errmess => this.errMsg = <any>errmess);
  }

}
