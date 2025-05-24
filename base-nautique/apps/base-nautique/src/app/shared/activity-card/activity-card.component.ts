import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activity } from '../../core/services/activity.service';

@Component({
  selector: 'app-activity-card',
  imports: [CommonModule],
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.css',
})
export class ActivityCardComponent {
    @Input() activity!: {_id:number; name: string; description: string; image: string };
    seeMore:string="Voir"
    constructor(){}

    goDetails(activity:Activity){
      console.log(activity)
    }
}
