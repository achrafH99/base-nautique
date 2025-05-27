
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterComponent } from '../../shared/poster/poster.component';
import { ActivityCardComponent } from '../../shared/activity-card/activity-card.component';
import { CompanyIntroComponent } from '../../shared/company-intro/company-intro.component';
import { HomeCardComponent } from '../../shared/home-card/home-card.component';
import { Activity, ActivityService } from '../../core/services/activity.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ActivityCardComponent,CompanyIntroComponent,HomeCardComponent,PosterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  activities :Activity[]= []
  values = [];

  constructor(private activityService:ActivityService){  }
 
ngOnInit():void{
  this.activityService.getActivities().subscribe((data)=> {
    this.activities=data
  })
}

}
