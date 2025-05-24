import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slot, SlotService } from '../../../core/services/slot/slot.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import {RRule} from 'rrule';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-activity-slot',
  imports: [CommonModule,ReactiveFormsModule,FullCalendarModule],
  templateUrl: './activity-slot.component.html',
  styleUrl: './activity-slot.component.css',
})
export class ActivitySlotComponent implements OnInit {
  slots: Slot[] = [];
  activityId!: string;
  slotForm!: FormGroup;
  editingSlot: Slot | null = null;
  viewMode: 'list' | 'calendar' = 'list';
  showModal: boolean = false;
  selectedSlot: Slot | null = null;

calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,timeGridPlugin,interactionPlugin],
    initialView: 'timeGridWeek', // par défaut : vue semaine
  headerToolbar: {
    left: 'dayGridMonth,timeGridWeek,timeGridDay',
    center: 'title',
    right: 'prev,next today',
  },
    weekends: true,
   events: this.slots.map(slot => ({
    id: slot._id,
    title: `Places: ${slot.bookedPlaces}/${slot.maxPlaces}`,
    start: slot.startTime,  // objet Date ou string ISO
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
  eventClick: this.onEventClick.bind(this),  // ⚠️ méthode définie ci-dessous
  dateClick: this.onDateClick.bind(this),
  };

  constructor(
    private route: ActivatedRoute,
    private slotService: SlotService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log("here")
    this.activityId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.activityId)
    this.loadSlots();

    this.slotForm = this.fb.group({
      frequency: [''], 
      maxPlaces: [1, [Validators.required, Validators.min(1)]],
        recurrenceStartDate: [''],
        recurrenceEndDate: [''],
        slotDuration: [''],
        slotStartTime: [''],
    });

  }

  loadSlots(): void {
    this.slotService.getSlotsByActivity(this.activityId).subscribe(slots => {
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

  onSubmit() {
    console.log(this.slotForm.invalid)
  if (this.slotForm.invalid) return;

  const formValue = this.slotForm.value;

  const recurrenceStart = new Date(formValue.recurrenceStartDate + 'T' + formValue.slotStartTime);
  const recurrenceEnd = new Date(formValue.recurrenceEndDate + 'T23:59:59');
  const slotDurationMinutes = parseInt(formValue.slotDuration, 10);
  const frequency = formValue.frequency;
  const maxPlaces = formValue.maxPlaces;

  if (!frequency) {
    // Un seul créneau simple
    const slotEnd = new Date(recurrenceStart.getTime() + slotDurationMinutes * 60 * 1000);
    const slotsToCreate = [{
      startTime: recurrenceStart,
      endTime: slotEnd,
      maxPlaces,
    }];
    this.sendSlots(slotsToCreate);
    return;
  }

  // Récurrence
  let freq;
  switch (frequency) {
    case 'daily':
      freq = RRule.DAILY;
      break;
    case 'weekly':
      freq = RRule.WEEKLY;
      break;
    case '15min':
      freq = null; // gestion spéciale
      break;
    default:
      freq = null;
  }

  if (freq) {
    const rule = new RRule({
      freq,
      dtstart: recurrenceStart,
      until: recurrenceEnd,
    });

    const slotsToCreate = rule.all().map((start: Date) => {
      const end = new Date(start.getTime() + slotDurationMinutes * 60 * 1000);
      return {
        startTime: start,
        endTime: end,
        maxPlaces,
      };
    });

    this.sendSlots(slotsToCreate);
  } else if (frequency === '15min') {
    const slotsToCreate = [];
    let current = new Date(recurrenceStart);

    while (current <= recurrenceEnd) {
      const end = new Date(current.getTime() + slotDurationMinutes * 60 * 1000);
      slotsToCreate.push({
        startTime: new Date(current),
        endTime: end,
        maxPlaces,
      });
      current.setMinutes(current.getMinutes() + 15);
    }

    this.sendSlots(slotsToCreate);
  }
}


sendSlots(slots: any[]) {
  const requests = slots.map(slot =>
    this.slotService.createSlot({
      activityId: this.activityId,
      startTime: slot.startTime.toISOString(),
      endTime: slot.endTime.toISOString(),
      maxPlaces: slot.maxPlaces,
    })
  );

  forkJoin(requests).subscribe({
    next: (results) => {
      this.slots.push(...results);
      this.updateCalendarEvents();
      this.slotForm.reset();
      this.editingSlot = null;
    },
    error: (err) => {
      console.error('Erreur lors de la création des créneaux', err);
    },
  });
}


 onEdit(slot: Slot): void {
  this.editingSlot = slot;

  const start = new Date(slot.startTime);
  const end = new Date(slot.endTime);

  this.slotForm.patchValue({
    startDate: start.toISOString().substring(0, 10), 
    endDate: end.toISOString().substring(0, 10),    
    startTime: start.toISOString().substring(11, 16),
    endTime: end.toISOString().substring(11, 16),     
    maxPlaces: slot.maxPlaces,
    frequency: '', 
  });
}

  formatDateForInput(date: Date | string): string {
  const d = new Date(date);
  return d.toISOString().substring(0, 16);
}

  onDelete(id: string): void {
    this.slotService.deleteSlot(id).subscribe(() => {
      this.loadSlots();
    });
  }

 onEventClick(info: any): void {
   const slot = info.event.extendedProps.slotData;
  this.selectedSlot = slot;
  this.showModal = true;
}

onDateClick(event:any):void{

}


}
