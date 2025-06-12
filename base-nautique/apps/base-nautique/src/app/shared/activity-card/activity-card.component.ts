import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activity } from '../../core/services/activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-card',
  imports: [CommonModule],
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.css',
})
export class ActivityCardComponent {
    @Input() activity!: {_id:number; name: string; description: string; image: string };
    seeMore:string="Voir";
    private router = inject(Router);

    constructor(){}

    goDetails(activity:Activity){
        this.router.navigate(['/activity', activity._id]);
    }
}
