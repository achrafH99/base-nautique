import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/base-nautique/src/environments/environment';
import { Observable } from 'rxjs';

export interface Slot {
  _id?: string;
  activityId: string;
  startTime: string; 
  endTime: string;
  maxPlaces: number;
  bookedPlaces?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  base_url = `${environment.api_url}/slot`
  constructor(private http:HttpClient) { }

   getSlotsByActivity(activityId: string): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.base_url}/${activityId}`); // change to activitity
  }

  createSlot(slot: Slot): Observable<Slot> {
    return this.http.post<Slot>(this.base_url, slot);
  }

  updateSlot(id: string, slot: Partial<Slot>): Observable<Slot> {
    return this.http.put<Slot>(`${this.base_url}/${id}`, slot);
  }

  deleteSlot(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base_url}/${id}`);
  }
}
