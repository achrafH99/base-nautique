import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../core/services/reservation/reservation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {ReservationService} from '../../../core/services/reservation.service';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent implements OnInit {
  reservations: any[] = [];
  startDate: string = '';
  endDate: string = '';

  constructor(private reservationService:ReservationService) {}

  ngOnInit(): void {
    this.loadAllReservations();
  }

  loadAllReservations() {
    this.reservationService.getAllReservations().subscribe((data:any) => {
      this.reservations = data;
    });
  }

  loadReservations() {
    if (!this.startDate || !this.endDate) return;

    this.reservationService.getBetweenDates(new Date(this.startDate), new Date(this.endDate))
      .subscribe((data:any) => {
        this.reservations = data;
      });
  }

  resetFilter() {
    this.startDate = '';
    this.endDate = '';
    this.loadAllReservations();
  }

  deleteReservation(id: string) {
    if (confirm('Confirmer la suppression de cette réservation ?')) {
      this.reservationService.deleteReservation(id).subscribe(() => {
        this.reservations = this.reservations.filter(r => r._id !== id);
      });
    }
  }
}
