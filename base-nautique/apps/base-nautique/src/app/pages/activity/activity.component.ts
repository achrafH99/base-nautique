import  interactionPlugin  from '@fullcalendar/interaction';
import  timeGridPlugin  from '@fullcalendar/timegrid';
import  dayGridPlugin  from '@fullcalendar/daygrid';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Activity, ActivityService } from '../../core/services/activity.service';
import { ActivityDetailsComponent } from '../../shared/activity-details/activity-details.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { Slot } from '../../core/services/slot/slot.service';

@Component({
  selector: 'app-activity',
  imports: [CommonModule,ActivityDetailsComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent implements OnInit {
  private route = inject(ActivatedRoute);
  id = "";
  activity! : Activity

  constructor(private activityService:ActivityService){}
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params)
        this.id = params['id'];
        this.activityService.getOneActivity(this.id).subscribe((data) => {
          console.log(data)
          this.activity = data;
        })
    });
    console.log(this.activity)
  }

  
}
