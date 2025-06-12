import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/base-nautique/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  
  constructor(private http: HttpClient) {}
  
 createReservation(data: {
  slotId: string;
  userEmail: string;
  userPhone: string;
  userName: string;
  createdAt: string;
  bookedPlaces:number
}) {
  return this.http.post(`${environment.api_url}/reservation`, data);
}

 getBetweenDates(start: Date, end: Date) {
    const params = new HttpParams()
      .set('start', start.toISOString())
      .set('end', end.toISOString());

    return this.http.get(`${environment.api_url}/reservation/between`, { params });
  }

  getAllReservations() {
  return this.http.get(`${environment.api_url}/reservation`);
}

deleteReservation(id: string) {
  return this.http.delete(`${environment.api_url}/reservation/${id}`);
}


}
