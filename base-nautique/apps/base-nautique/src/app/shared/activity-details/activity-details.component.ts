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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../core/services/reservation/reservation.service';
@Component({
  selector: 'app-activity-details',
  imports: [CommonModule,FullCalendarModule,ReactiveFormsModule],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css',
})
export class ActivityDetailsComponent implements OnInit {
@Input() activity!: Activity;
activityId=''
slots: Slot[] = [];
registrationForm!: FormGroup;
  selectedSlot!: Slot;
  showRegistration = false;
  errorMessage = '';
  
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
    title: `Places: ${slot.maxPlaces-slot.bookedPlaces}`,
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
  eventClick: this.onEventClick.bind(this), 
  // dateClick: this.onDateClick.bind(this),
  };

  constructor(
    private route: ActivatedRoute,
    private slotService: SlotService,
    private reservationService:ReservationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log("here")
    this.activityId = this.route.snapshot.paramMap.get('id')!;
    this.loadSlots();
        this.initForm();
  }

   onEventClick(arg: any) {
    console.log("here")
    const slotId = arg.event.id;
    this.selectedSlot = this.slots.find(s => s._id === slotId)!;
    if (this.selectedSlot) {
      this.errorMessage = '';
      this.registrationForm.reset({ places: 1 });
      this.showRegistration = true;
    }
  }

   initForm() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      places: [1, [Validators.required, Validators.min(1)]]
    });
  }

  submitRegistration() {
    if (!this.selectedSlot) return;
    if (this.registrationForm.invalid) return;

    const { name, email, phone, places } = this.registrationForm.value;

    if (places > (this.selectedSlot.maxPlaces - this.selectedSlot.bookedPlaces)) {
      this.errorMessage = 'Pas assez de places disponibles.';
      return;
    }

    const slotId = this.selectedSlot._id!;
    
    const reservationData = {
      slotId,
      userEmail: email,
      userPhone: phone,
      userName: name,
      createdAt: new Date().toISOString(),
      bookedPlaces:places
    };

    this.reservationService.createReservation(reservationData).subscribe({
      next: () => {
        alert('Inscription réussie !');
        this.showRegistration = false;
        this.loadSlots();
      },
      error: err => {
        this.errorMessage = 'Erreur lors de l\'inscription.';
        console.error(err);
      }
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
      title: `Places: ${slot.maxPlaces-slot.bookedPlaces}`,
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
    })),
    eventClick: this.onEventClick.bind(this),
  };
}

closeModal() {
  console.log("iciiiiii")
  this.showRegistration = false;
}

}
