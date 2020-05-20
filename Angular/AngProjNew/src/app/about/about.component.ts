import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
 
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor( private LeaderService: LeaderService ) { }

  Leaders: Leader[];

  ngOnInit(): void {
    this.Leaders = this.LeaderService.getLeaders();
  }

}
