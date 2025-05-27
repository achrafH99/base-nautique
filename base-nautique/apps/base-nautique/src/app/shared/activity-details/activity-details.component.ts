import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../core/services/activity.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import  interactionPlugin  from '@fullcalendar/interaction';
import  timeGridPlugin  from '@fullcalendar/timegrid';
import  dayGridPlugin  from '@fullcalendar/daygrid';
import { Slot, SlotService } from '../../core/services/slot/slot.service';
import { CalendarOptions } from '@fullcalendar/core';
@Component({
  selector: 'app-activity-details',
  imports: [CommonModule,FullCalendarModule],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css',
})
export class ActivityDetailsComponent implements OnInit {
@Input() activity!: Activity;
slots: Slot[] = [];
calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,timeGridPlugin,interactionPlugin],
    initialView: 'timeGridWeek', 
  headerToolbar: {
    left: 'dayGridMonth,timeGridWeek,timeGridDay',
    center: 'title',
    right: 'prev,next today',
  },
    weekends: true,
   events: this.slots.map(slot => ({
    id: slot._id,
    title: `${new Date(slot.endTime)-new Date(slot.startTime)}`,
    start: slot.startTime, 
    end: slot.endTime,
    extendedProps: {
      test:"iciiiii",
      slotId: slot._id,
      startTime: slot.startTime,  
      endTime: slot.endTime,
      maxPlaces: slot.maxPlaces,
      bookedPlaces: slot.bookedPlaces,
      slotData: slot  
    }
  })),
  };
 constructor(private slotService:SlotService){}

 ngOnInit(){
this.loadSlots()

 }

 loadSlots(): void {
    this.slotService.getSlotsByActivity(this.activity._id.toString()).subscribe(slots => {
      this.slots = slots;
    this.updateCalendarEvents();
  });
}

updateCalendarEvents(): void {
  this.calendarOptions = {
    ...this.calendarOptions,
    events: this.slots.map(slot => ({
      id: slot._id,
      title: `Places: ${slot.bookedPlaces}/${slot.maxPlaces}`,
      start: slot.startTime,
      end: slot.endTime,
      allDay: false, 
      extendedProps: {
        slotId: slot._id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        maxPlaces: slot.maxPlaces,
        bookedPlaces: slot.bookedPlaces,
        slotData: slot
      }
    }))
  };
}
}
